import { ApiPromise, WsProvider } from '@polkadot/api';
import React, { useState, useEffect } from "react";

class Node {

  constructor() {
    this._api = null;
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

export default Node; 