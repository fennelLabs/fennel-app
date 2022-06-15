import {ApiPromise, WsProvider} from '@polkadot/api';
import axios from 'axios';
import {BehaviorSubject, count} from 'rxjs';
import {TextDecoder} from 'text-encoding';
import {NODE_URI_HTTP} from '../../config';

class Node {
  _signals = new BehaviorSubject([]);

  signals$ = this._signals.asObservable();

  constructor() {
    this._api = null;
  }

  async createIdentity(keymanager) {
    const node = await this.api();
    let identity_number = await node.tx.identityModule
      .createIdentity()
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
          return 0;
        }
      });
    return identity_number;
  }

  async sendNewSignal(keymanager, content) {
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
  }

  async listenForSignals() {
    var events_list = [];

    const decoder = new TextDecoder('utf-8');
    const node = await this.api();
    const signedBlock = await node.rpc.chain.getBlock();
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
      const provider = new WsProvider('ws://127.0.0.1:9944');
      this._api = await ApiPromise.create({provider});
    } catch (error) {
      console.error(error);
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
