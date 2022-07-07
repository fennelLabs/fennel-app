import {ApiPromise} from '@polkadot/api';
import {BehaviorSubject, Subject} from 'rxjs';
import {TextDecoder} from 'text-encoding';
import {NODE_URI_WS} from '../../config';

class Node {
  /**
   * @type {BehaviorSubject}
   * @private
   */
  _signals = new BehaviorSubject([]);
  signals$ = this._signals.asObservable();

  /**
   * @type {BehaviorSubject}
   * @private
   */
  _balance = new BehaviorSubject(0);
  balance$ = this._balance.asObservable();

  /**
   * @type {BehaviorSubject}
   * @private
   */
  _fee = new BehaviorSubject(0);
  fee$ = this._fee.asObservable();

  /**
   * @type {BehaviorSubject}
   * @private
   */
  _defaultIdentity = new BehaviorSubject(undefined);
  defaultIdentity$ = this._defaultIdentity.asObservable();

  /**
   * @type {ApiPromise}
   * @private
   */
  _api;

  /**
   * @param {ApiPromise} api
   */
  constructor(api) {
    this._api = api;
  }

  async getBalance(keymanager) {
    if (!keymanager.signer()) {
      this._balance.next(0);
    } else {
      const {_, data: balance} = await this._api.query.system.account(
        keymanager.signer().address
      );
      this._balance.next(`${balance.free}`);
    }
  }

  async getFeeForCreateIdentity(keymanager) {
    if (!keymanager.signer()) return;
    const info = await this._api.tx.identityModule
      .createIdentity()
      .paymentInfo(keymanager.signer());
    this._fee.next(info.partialFee.toNumber());
  }

  async createIdentity(keymanager, callback) {
    const identitySubject = new Subject();
    const sub = identitySubject.subscribe((id) => {
      callback(id);
      sub.unsubscribe();
    });

    this._api.tx.identityModule
      .createIdentity()
      .signAndSend(keymanager.signer(), ({events = [], txHash}) => {
        console.log(`Transaction hash ${txHash.toHex()}`);
        events.forEach(({phase, event: {data, method, section}}) => {
          console.log(`\t' ${phase}: ${section}.${method}:: ${data}`);
          let id = parseInt(data[0].toString());
          if (
            section == 'identityModule' &&
            method == 'IdentityCreated' &&
            id
          ) {
            identitySubject.next(id);

            if (!this._defaultIdentity.value) {
              this._defaultIdentity.next(id);
            }
          }
        });
      });
  }

  async getFeeForAnnounceKey(keymanager, fingerprint, location) {
    if (!keymanager.signer()) return;

    const info = await this._api.tx.keystoreModule
      .announceKey(fingerprint, location)
      .paymentInfo(keymanager.signer());
    this._fee.next(info.partialFee.toNumber());
  }

  async announceKey(keymanager, fingerprint, location) {
    let retval = await this._api.tx.keystoreModule
      .announceKey(fingerprint, location)
      .signAndSend(keymanager.signer(), ({events = [], status, txHash}) => {
        console.log(`Current status is ${status.type}`);

        if (status.isFinalized) {
          console.log(
            `Transaction included at blockHash ${status.asFinalized}`
          );
          console.log(`Transaction hash ${txHash.toHex()}`);

          events.forEach(({phase, event: {data, method, section}}) => {
            console.log(`\t' ${phase}: ${section}.${method}:: ${data}`);
          });

          return true;
        }

        return false;
      });

    return retval;
  }

  async getFeeForRevokeKey(keymanager, fingerprint) {
    if (!keymanager.signer()) return;

    const info = await this._api.tx.keystoreModule
      .revokeKey(fingerprint)
      .paymentInfo(keymanager.signer());
    this._fee.next(info.partialFee.toNumber());
  }

  async revokeKey(keymanager, fingerprint) {
    await this._api.tx.keystoreModule
      .revokeKey(fingerprint)
      .signAndSend(keymanager.signer(), ({events = [], status, txHash}) => {
        console.log(`Current status is ${status.type}`);

        if (status.isFinalized) {
          console.log(
            `Transaction included at blockHash ${status.asFinalized}`
          );
          console.log(`Transaction hash ${txHash.toHex()}`);

          events.forEach(({phase, event: {data, method, section}}) => {
            console.log(`\t' ${phase}: ${section}.${method}:: ${data}`);
          });

          unsub();
        }
      });
  }

  async getFeeForSendNewSignal(keymanager, content) {
    if (!keymanager.signer()) return;

    const info = await this._api.tx.signalModule
      .sendSignal(content)
      .paymentInfo(keymanager.signer());
    this._fee.next(info.partialFee.toNumber());
  }

  async sendNewSignal(keymanager, content) {
    try {
      await this._api.tx.signalModule
        .sendSignal(content)
        .signAndSend(keymanager.signer(), (result) => {
          console.log(`Current status is ${result.status}`);

          if (result.status.isInBlock) {
            console.log(
              `Transaction included at blockHash ${result.status.asInBlock}`
            );
          } else if (result.status.isFinalized) {
            console.log(
              `Transaction finalized at blockHash ${result.status.asFinalized}`
            );
          }
        });
    } catch (e) {
      throw 'sendNewSignal() failed.';
    }
  }

  async listenForSignals() {
    var events_list = [];

    const decoder = new TextDecoder('utf-8');

    const signedBlock = await this._api.rpc.chain.getBlock();
    const apiAt = await this._api.at(signedBlock.block.header.hash);
    const allRecords = await apiAt.query.system.events();

    signedBlock.block.extrinsics.forEach(
      ({method: {method, section}}, index) => {
        if (method == 'sendSignal' && section == 'signalModule') {
          const events = allRecords
            .filter(
              ({phase}) =>
                phase.isApplyExtrinsic && phase.asApplyExtrinsic.eq(index)
            )
            .map(({event}) => {
              return {
                id: event.index,
                section: event.section,
                method: event.method,
                message: decoder.decode(event.data[0])
              };
            });

          events_list.push(...events);
        }
      }
    );

    let new_events_list = events_list.filter((element) => {
      return (
        element.section == 'signalModule' && element.method == 'SignalSent'
      );
    });

    let final_events = Array.from(
      new Set([...this._signals.value, ...new_events_list].map(JSON.stringify))
    ).map(JSON.parse);

    this._signals.next(final_events);
  }

  async getDiagnosticsData() {
    try {
      let data = await Promise.all([
        this._api.genesisHash.toHex(),
        this._api.rpc.system.chain(),
        this._api.rpc.system.name(),
        this._api.rpc.system.version()
      ]);
      await this.disconnect();
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async getMetaData() {
    try {
      let data = await Promise.all([this._api.rpc.rpc.methods()]);
      await this.disconnect();
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  get_metadata_request() {
    let request = new Request(NODE_URI_WS, {
      method: 'POST',
      body: JSON.stringify({
        id: 1,
        jsonrpc: '2.0',
        method: 'state_getMetadata'
      }),
      headers: {'Content-Type': 'application/json'}
    });
    return request;
  }

  disconnect() {
    if (this._api) {
      this._api.disconnect();
    }
  }

  apiNotReady() {
    return !this._api;
  }
}

export default Node;
