import {ApiPromise, WsProvider} from '@polkadot/api';
import {NODE_URI_WS} from '../config';

function connect() {
  return new ApiPromise({provider: new WsProvider(`${NODE_URI_WS}`)});
}

export default connect;
