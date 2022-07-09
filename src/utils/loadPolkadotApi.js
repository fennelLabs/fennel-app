import {ApiPromise, ApiRx, WsProvider} from '@polkadot/api';
import {NODE_URI_WS} from '../config';

function connect() {
  const options = {provider: new WsProvider(`${NODE_URI_WS}`)};
  return {rxjs: new ApiRx(options), promise: new ApiPromise(options)};
}

export default connect;
