import {ApiPromise, ApiRx, WsProvider} from '@polkadot/api';
import {ApiBase} from '@polkadot/api/base';
import {BehaviorSubject, Observable} from 'rxjs';
import {NODE_URI_WS} from '../config';

function connect() {
  const options = {provider: new WsProvider(`${NODE_URI_WS}`)};
  return {rxjs: new ApiRx(options), promise: new ApiPromise(options)};
}

/**
 *
 * @param {ApiBase} promise
 * @returns {{$: Observable<boolean>, value: () => boolean}}
 */
export function listenForConnection(promise) {
  const connected = new BehaviorSubject(promise.isConnected);

  const disconnectedCallback = () => {
    connected.next(false);
  };

  const connectedCallback = () => {
    connected.next(true);
  };

  promise.on('disconnected', disconnectedCallback);
  promise.on('connected', connectedCallback);

  return {
    $: connected.asObservable(),
    value: () => {
      return connected.value;
    }
  };
}

export default connect;
