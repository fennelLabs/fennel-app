
import * as React from 'react';
import RPCService from '../../../services/RPCService/RPCService.tsx';

class Diagnostics extends React.Component {

  constructor(props) {
    super(props);
    this.state = { data: {} };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {

    const service = new RPCService();
    const api = await service.api();//await service.getInstance();

    const [genesisHash, chain, nodeName, nodeVersion] = await Promise.all([
      api.genesisHash.toHex(),
      api.rpc.system.chain(),
      api.rpc.system.name(),
      api.rpc.system.version(),
    ]);

    this.setState({ data: { 
      genesisHash: genesisHash,
      chain: chain,
      nodeName: nodeName,
      nodeVersion: nodeVersion 
    }});
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
          <dt>
            Chain
          </dt>
          <dd>
            {this.state.data.chain}
          </dd>
          <dt>
            Node Name
          </dt>
          <dd>
            {this.state.data.nodeName}
          </dd>
          <dt>
            Node Version
          </dt>
          <dd>
            {this.state.data.nodeVersion}
          </dd>
        </dl>
      </div>);
  };

}

export default Diagnostics;