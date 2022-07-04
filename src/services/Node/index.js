import {ApiPromise, WsProvider} from '@polkadot/api';
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
  _defaultIdentity = new BehaviorSubject(undefined);
  defaultIdentity$ = this._defaultIdentity.asObservable();

  constructor() {
    this._api = null;
  }

  async getBalance(keymanager) {
    const node = await this.api();
    if (!keymanager.signer()) {
      this._balance.next(0);
    } else {
      const {_, data: balance} = await node.query.system.account(
        keymanager.signer().address
      );
      this._balance.next(`${balance.free}`);
    }
  }

  async getFeeForCreateIdentity(keymanager) {
    const node = await this.api();
    return node.tx.identityModule
      .createIdentity()
      .paymentInfo(keymanager.signer())
      .partialFee.toHuman();
  }

  async createIdentity(keymanager, callback) {
    const node = await this.api();
    const identitySubject = new Subject();
    const sub = identitySubject.subscribe((id) => {
      callback(id);
      sub.unsubscribe();
    });

    node.tx.identityModule
      .createIdentity()
      .signAndSend(keymanager.signer(), ({events = [], txHash}) => {
        console.log(`Transaction hash ${txHash.toHex()}`);
        events.forEach(({phase, event: {data, method, section}}) => {
          console.log(`\t' ${phase}: ${section}.${method}:: ${data}`);
          let id = data[0];
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
    const node = await this.api();
    return node.tx.keystoreModule
      .announceKey(fingerprint, location)
      .paymentInfo(keymanager.signer())
      .partialFee.toHuman();
  }

  async announceKey(keymanager, fingerprint, location) {
    const node = await this.api();
    let retval = await node.tx.keystoreModule
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
    const node = await this.api();
    return node.tx.keystoreModule
      .revokeKey(fingerprint)
      .paymentInfo(keymanager.signer())
      .partialFee.toHuman();
  }

  async revokeKey(keymanager, fingerprint) {
    const node = await this.api();
    await node.tx.keystoreModule
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
    const node = await this.api();
    return node.tx.signalModule
      .sendSignal(content)
      .paymentInfo(keymanager.signer())
      .partialFee.toHuman();
  }

  async sendNewSignal(keymanager, content) {
    try {
      const node = await this.api();
      await node.tx.signalModule
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
            unsub();
          }
        });
    } catch (e) {
      throw 'sendNewSignal() failed.';
    }
  }

  async listenForSignals() {
    var events_list = [];

    const decoder = new TextDecoder('utf-8');
    const node = await this.api();
    try {
      //If node is unavailable, this is actually where the error gets thrown, not the previous line.
      const signedBlock = await node.rpc.chain.getBlock();
    } catch (e) {
      throw 'Node query failed.';
    }
    const apiAt = await node.at(signedBlock.block.header.hash);
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
    const node = await this.api();
    try {
      let data = await Promise.all([
        node.genesisHash.toHex(),
        node.rpc.system.chain(),
        node.rpc.system.name(),
        node.rpc.system.version()
      ]);
      await this.disconnect();
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async getMetaData() {
    const node = await this.api();
    try {
      let data = await Promise.all([node.rpc.rpc.methods()]);
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

  async api() {
    if (this.apiNotReady()) {
      await this.connect();
    }
    return this._api;
  }

  async connect() {
    try {
      const wsProvider = new WsProvider(`${NODE_URI_WS}`);
    } catch (e) {
      throw 'Unable to instantiate Fennel node websocket connection. No provider instantiated.';
    }

    try {
      this._api = await ApiPromise.create({wsProvider});
    } catch (e) {
      throw 'Unable to instantiate Fennel node websocket connection. Provider instantiated.';
    }
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
