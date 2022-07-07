import {ApiPromise, WsProvider} from '@polkadot/api';
import {NODE_URI_WS} from '../config';

async function connect() {
  const api = await ApiPromise.create({
    wsProvider: new WsProvider(`${NODE_URI_WS}`)
  });
  await api.isReady;
  return api;
}

export default connect;
