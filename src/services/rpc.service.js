import {filter, map, ReplaySubject, Subject} from 'rxjs';
import {CLI_URI} from '../config';

export class FennelRPC {
  /**
   * @type {Number}
   * @private
   */
  _count = 0;

  /**
   * the web socket instance
   * @type {WebSocket}
   * @private
   */
  _ws;

  /**
   * messages incoming from RPC
   * @type {ReplaySubject}
   * @private
   */
  _incomingMessages = new ReplaySubject(null);

  /**
   * when web socket connection opens, this will be true
   * when web socket is closed, this will be false
   * @type {Subject<boolean>}
   * @private
   */
  _isReady = new Subject();

  /**
   * captures outgoing messages when ws is offline
   * and pushes them through ws when it comes back online
   * @type {Array}
   * @private
   */
  _offlineOutgoingMessageQueue = [];

  constructor() {
    this._isReady.subscribe((isReady) => console.log('isReady? ', isReady));
  }

  /**
   * @private
   * @returns {boolean}
   */
  isOpen() {
    const state = this._ws?.readyState;
    return this._ws && this._ws.OPEN === state;
  }

  /**
   * @private
   * @returns {boolean}
   */
  isOpenOrConnecting() {
    const state = this._ws?.readyState;
    return (
      this._ws && (this._ws.OPEN === state || this._ws.CONNECTING === state)
    );
  }

  close() {
    this._ws.close();
  }

  open() {
    if (this.isOpenOrConnecting()) {
      console.info('websocket is open or connecting');
      return;
    }

    this._ws = new WebSocket(CLI_URI);
    this._ws.onmessage = (m) => {
      this._incomingMessages.next(JSON.parse(m.data));
    };

    this._ws.onopen = () => {
      console.log('web socket opened!');

      // sends all messages captured while the websocket was offline
      this._offlineOutgoingMessageQueue.forEach((m) => this._ws.send(m));
      // reset for next time
      this._offlineOutgoingMessageQueue = [];

      this._isReady.next(true);
    };

    this._ws.onclose = () => {
      console.log('web socket closed!');

      this._isReady.next(false);
    };
  }

  send({method, params, id}, callback) {
    if (!/\w+/g.test(method)) {
      console.error('method name cannot be empty');
      return;
    }

    id = id ?? ++this._count;

    const message = JSON.stringify({
      jsonrpc: '2.0',
      id,
      method,
      params: params ?? []
    });

    if (this.isOpen()) {
      this._ws.send(message);
    } else {
      console.info('message queued: websocket is offline');
      this._offlineOutgoingMessageQueue.unshift(message);
    }

    return this._incomingMessages
      .pipe(
        filter((m) => m.id === id),
        map((m) => m.result)
      )
      .subscribe(callback);
  }
}
