import { ApiPromise, WsProvider } from '@polkadot/api';
import * as React from 'react';

class Diagnostics extends React.Component {

  constructor(props) {
    super(props);
    this.state = { data: {} };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {

    const wsProvider = new WsProvider('ws://127.0.0.1:9944');
    const api = await ApiPromise.create({ provider: wsProvider });
    
    const genesisHash = api.genesisHash.toHex();
    this.setState({ data: { genesisHash: genesisHash }});

    console.log(this.state.data.genesisHash);
  }

  render() {
    return (
      <div>
        <dl>
          <dt>
            Genesis Hash
          </dt>
          <dd>
            {this.state.data.genesisHash}
          </dd>
        </dl>
      </div>);
  };

}

export default Diagnostics;