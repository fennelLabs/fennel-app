import { ApiPromise, WsProvider } from '@polkadot/api';
import * as React from 'react';

class Rpc extends React.Component {
    constructor(props) {
        super(props);
        this.state = { data: {} };
      }

      componentDidMount() {
        this.init();
      }

      init = async () => {
        const wsProvider = new WsProvider('ws://127.0.0.1:9944');
        const api = await ApiPromise.create({ provider: wsProvider });
        return api;
      }
}

export default Rpc;