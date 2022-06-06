import { ApiPromise, WsProvider } from '@polkadot/api';
import {NODE_URI} from '../../config';

class Node {

  constructor() {
    this._api = null;
  }

  async getDiagnosticsData() {

    const node = await this.api();
    try {
      let data = await Promise.all([
        node.genesisHash.toHex(),
        node.rpc.system.chain(),
        node.rpc.system.name(),
        node.rpc.system.version(),
      ]);
      await this.disconnect();
      return data;
    } catch (error) {
      console.log(error);
    }
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
      this._api = await ApiPromise.create({ provider });
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

export default CLI; 