import { ApiPromise, WsProvider } from '@polkadot/api';
import * as React from 'react';
export class RPCService extends React.Component {

  protected _api: ApiPromise;

  constructor(props) {
    super(props);
  }

  public async api(): Promise<ApiPromise> {
    if (this.apiNotReady()) {
      await this.connect();
    }
    return this._api;
  }

  protected async connect(): Promise<void> {
    try {
      const provider = new WsProvider('ws://127.0.0.1:9944');
      this._api = await ApiPromise.create({ provider });
    } catch (error) {
      console.error(error);
    }
  }

  public disconnect(): void {
    if (this._api) {
        this._api.disconnect();
    }
  }

  protected apiNotReady(): boolean {
    return !this._api;
  }

}
export default RPCService 