import {ApiPromise, ApiRx, WsProvider} from '@polkadot/api';
import {ApiBase} from '@polkadot/api/base';
import {BehaviorSubject} from 'rxjs';
import {NODE_URI_WS} from '../config';

function connect() {
  const options = {provider: new WsProvider(`${NODE_URI_WS}`)};
  return {rxjs: new ApiRx(options), promise: new ApiPromise(options)};
}

/**
 *
 * @param {ApiBase} promise
 * @returns {BehaviorSubject<boolean>}
 */
export function listenForConnection(promise) {
  const connected = new BehaviorSubject(promise.isConnected);
  console.log('outside react: setting up event callbacks');

  const disconnectedCallback = () => {
    console.log('disconnected outside react!');
    connected.next(false);
  };

  const connectedCallback = () => {
    console.log('connected outside react!');
    connected.next(true);
  };

  promise.on('disconnected', disconnectedCallback);
  promise.on('connected', connectedCallback);

  return connected;
}

export default connect;
