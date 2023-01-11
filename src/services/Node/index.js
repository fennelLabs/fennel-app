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
  _fee = new BehaviorSubject(0);
  fee$ = this._fee.asObservable();

  /**
   * @type {BehaviorSubject}
   * @private
   */
  _defaultIdentity = new BehaviorSubject(undefined);
  defaultIdentity$ = this._defaultIdentity.asObservable();

  _traits = new BehaviorSubject([]);
  traits$ = this._traits.asObservable();

  _certificates = new BehaviorSubject([]);
  certificates$ = this._certificates.asObservable();

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

  async getFeeForCreateIdentity(keymanager) {
    if (!keymanager.signer()) return;

    const api = await this.api();
    const info = await api.tx.identityModule
      .createIdentity()
      .paymentInfo(keymanager.address(), keymanager.signer());
    this._fee.next(info.partialFee.toNumber());
  }

  async createIdentity(keymanager, callback) {
    const identitySubject = new Subject();
    const sub = identitySubject.subscribe((id) => {
      callback(id);
      sub.unsubscribe();
    });

    const api = await this.api();
    await api.tx.identityModule
      .createIdentity()
      .signAndSend(
        keymanager.address(),
        {signer: keymanager.signer()},
        ({events = [], txHash}) => {
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
              this._defaultIdentity.next(id);
            }
          });
        }
      );
  }

  async getFeeForTransferToken(keymanager, address, amount) {
    if (!keymanager.signer()) return;

    const api = await this.api();
    const info = await api.tx.balances
      .transfer(address, amount)
      .paymentInfo(keymanager.address(), keymanager.signer());
    this._fee.next(info.partialFee.toNumber());
  }

  async transferToken(keymanager, address, amount) {
    console.log('TransferToken');
    console.log(`Address: ${address}`);
    console.log(`Amount: ${amount}`);
    const api = await this.api();
    const txHash = await api.tx.balances
      .transfer(address, parseInt(amount))
      .signAndSend(keymanager.address(), {signer: keymanager.signer()});
    console.log(`Submitted with hash ${txHash}`);
  }

  async getFeeForAnnounceKey(keymanager, fingerprint, location) {
    if (!keymanager.signer()) return;

    const api = await this.api();
    const info = await api.tx.keystoreModule
      .announceKey(fingerprint, location)
      .paymentInfo(keymanager.address(), keymanager.signer());
    this._fee.next(info.partialFee.toNumber());
  }

  async announceKey(keymanager, fingerprint, location) {
    const api = await this.api();
    return await api.tx.keystoreModule
      .announceKey(fingerprint, location)
      .signAndSend(
        keymanager.address(),
        {signer: keymanager.signer()},
        ({events = [], status, txHash}) => {
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
        }
      );
  }

  async getFeeForRevokeKey(keymanager, fingerprint) {
    if (!keymanager.signer()) return;

    const api = await this.api();
    const info = await api.tx.keystoreModule
      .revokeKey(fingerprint)
      .paymentInfo(keymanager.address(), keymanager.signer());
    this._fee.next(info.partialFee.toNumber());
  }

  async revokeKey(keymanager, fingerprint) {
    const api = await this.api();
    await api.tx.keystoreModule
      .revokeKey(fingerprint)
      .signAndSend(
        keymanager.address(),
        {signer: keymanager.signer()},
        ({events = [], status, txHash}) => {
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
        }
      );
  }

  async getFeeForSendNewSignal(keymanager, content) {
    if (!keymanager.signer()) return;

    const api = await this.api();
    const info = await api.tx.signalModule
      .sendSignal(content)
      .paymentInfo(keymanager.address(), keymanager.signer());
    this._fee.next(info.partialFee.toNumber());
  }

  async sendNewSignal(keymanager, content) {
    try {
      const api = await this.api();
      await api.tx.signalModule
        .sendSignal(content)
        .signAndSend(
          keymanager.address(),
          {signer: keymanager.signer()},
          (result) => {
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
          }
        );
    } catch (e) {
      throw 'sendNewSignal() failed.';
    }
  }

  async listenForSignals() {
    var events_list = [];

    const decoder = new TextDecoder('utf-8');

    const api = await this.api();

    const signedBlock = await api.rpc.chain.getBlock();
    const apiAt = await api.at(signedBlock.block.header.hash);
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
    const api = await this.api();

    try {
      let data = await Promise.all([
        api.genesisHash.toHex(),
        api.rpc.system.chain(),
        api.rpc.system.name(),
        api.rpc.system.version()
      ]);
      await this.disconnect();
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async getMetaData() {
    try {
      const api = await this.api();
      let data = await Promise.all([await api.rpc.methods()]);
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

  hex_to_string(metadata) {
    return metadata
      .match(/.{1,2}/g)
      .map(function (v) {
        return String.fromCharCode(parseInt(v, 16));
      })
      .join('');
  }

  async getFeeForAddOrUpdateIdentityTrait(keymanager, identity, key2, value) {
    if (!keymanager.signer()) return;

    const api = await this.api();
    const info = await api.tx.identityModule
      .addOrUpdateIdentityTrait(identity, key2, value)
      .paymentInfo(keymanager.address(), keymanager.signer());
    this._fee.next(info.partialFee.toNumber());
  }

  async addOrUpdateIdentityTrait(keymanager, identity, key2, value) {
    try {
      const api = await this.api();
      await api.tx.identityModule
        .addOrUpdateIdentityTrait(identity, key2, value)
        .signAndSend(
          keymanager.address(),
          {signer: keymanager.signer()},
          (result) => {
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
          }
        );
    } catch (e) {
      throw 'sendNewSignal() failed.';
    }
  }

  async getFeeForSendCertificate(keymanager, target) {
    if (!keymanager.signer()) return;

    const api = await this.api();
    const info = await api.tx.certificateModule
      .sendCertificate(target)
      .paymentInfo(keymanager.address(), keymanager.signer());
    this._fee.next(info.partialFee.toNumber());
  }

  async sendCertificate(keymanager, target) {
    try {
      const api = await this.api();
      await api.tx.certificateModule
        .sendCertificate(target)
        .signAndSend(
          keymanager.address(),
          {signer: keymanager.signer()},
          (result) => {
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
          }
        );
    } catch (e) {
      throw 'sendNewSignal() failed.';
    }
  }

  async checkCertificateList() {
    let api = await this.api();
    let certList = await api.query.certificateModule.certificateList.entries();
    let result = [];
    certList.forEach(
      ([
        {
          args: [key1, key2]
        }
      ]) => {
        result.push({
          origin: key1.toString(),
          target: key2.toString()
        });
      }
    );
    this._certificates.next(result);
  }

  async getIdentityTraits(identity) {
    let api = await this.api();
    let traitsList = await api.query.identityModule.identityTraitList.entries();
    let result = [];
    traitsList.forEach(
      ([
        {
          args: [key1, key2]
        },
        value
      ]) => {
        if (key1.toNumber() === identity) {
          result[this.hex_to_string(key2.toHex())] = this.hex_to_string(
            value.toHex()
          );
        }
      }
    );
    this._traits.next(result);
  }

  disconnect() {
    this.api().then((a) => a.disconnect());
  }

  apiNotReady() {
    return !this._api?.isConnected;
  }

  async api() {
    await this._api.isReady;
    return this._api;
  }
}

export default Node;
