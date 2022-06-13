import {ApiPromise, WsProvider} from '@polkadot/api';
import axios from 'axios';
import { NODE_URI_HTTP } from '../../config';

class Node {
  constructor() {
    this._api = null;
  }

  /*async*/ createIdentity() {
    console.log('Execute substrate node extrinsic: create_identity');
    /*let headers = {
      "Content-Type": "application/json",
      "Accept": "text/plain"
    }
    let bodyContent = JSON.stringify({
        "id":1,
        "jsonrpc":"2.0",
        "method": "runtime_getState",
        "params":["System", "Events",[]]
    });
    let tx_res = await axios.post(NODE_URI_HTTP,bodyContent,{headers:headers})
    console.log(tx_res);*/
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
      let data = await Promise.all([
        node.rpc.rpc.methods()
      ]);
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
        method: 'state_getMetadata',
      }),
      headers: { 'Content-Type': 'application/json' },
    })
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
