import {ApiRx} from '@polkadot/api';
import {BehaviorSubject, filter, switchMap} from 'rxjs';
import KeyManager from './KeyManager';

class ChainAccountService {
  /**
   * @private
   */
  _balance = new BehaviorSubject(0);
  balance$ = this._balance.asObservable();

  /**
   * @private
   */
  _api;

  /**
   * @private
   */
  _keyManager;

  /**
   * @param {ApiRx} api
   * @param {KeyManager} keyManager
   */
  constructor(api, keyManager) {
    this._api = api;
    this._keyManager = keyManager;
  }

  listenForBalanceChanges() {
    return this._keyManager.pair$
      .pipe(
        filter((a) => !!a),
        switchMap((a) => this._api.query.system.account(a.address))
      )
      .subscribe(({nonce, data: balance}) => {
        this._balance.next(balance.free.toString());
        console.log(
          `free balance is ${balance.free} with ${balance.reserved} reserved and a nonce of ${nonce}`
        );
      });
  }
}

export default ChainAccountService;
