import { ApiPromise, WsProvider } from '@polkadot/api';
import React, { useState, useEffect } from "react";

const RPCService = (props) => {

  const _api: ApiPromise = null;

  useEffect(() => {
    api();
  });


  async function api(): Promise<ApiPromise> {
    if (this.apiNotReady()) {
      await connect();
    }
    return this._api;
  }

  async function connect(): Promise<void> {
    try {
      const provider = new WsProvider('ws://127.0.0.1:9944');
      this._api = await ApiPromise.create({ provider });
    } catch (error) {
      console.error(error);
    }
  }

  function disconnect(): void {
    if (_api) {
      _api.disconnect();
    }
  }

  function apiNotReady(): boolean {
    return !_api;
  }

}

export default RPCService 