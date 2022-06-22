import {BehaviorSubject, filter, map, ReplaySubject} from 'rxjs';
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
   * @type {BehaviorSubject<boolean>}
   * @private
   */
  _isWebSocketOpen = new BehaviorSubject(false);
  isWebSocketOpen$ = this._isWebSocketOpen.asObservable();

  /**
   * captures outgoing messages when ws is offline
   * and pushes them through ws when it comes back online
   * @type {Array}
   * @private
   */
  _offlineOutgoingMessageQueue = [];

  constructor() {
    this.open();

    this._isWebSocketOpen
      .pipe(filter((isOpen) => isOpen))
      .subscribe((_) => console.log('websocket opened'));
  }

  /**
   * @returns {boolean}
   */
  isOpen() {
    const state = this._ws?.readyState;
    return this._ws && this._ws.OPEN === state;
  }

  /**
   * @returns {boolean}
   */
  isOpenOrConnecting() {
    const state = this._ws?.readyState;
    return (
      this._ws && (this._ws.OPEN === state || this._ws.CONNECTING === state)
    );
  }

  close() {
    this._ws?.close();
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
      // sends all messages captured while the websocket was offline
      this._offlineOutgoingMessageQueue.forEach((m) => this._ws.send(m));
      // reset for next time
      this._offlineOutgoingMessageQueue = [];
      this._isWebSocketOpen.next(true);
    };

    this._ws.onerror = (e) => {
      console.error(e);
    };

    this._ws.onclose = () => {
      console.log('web socket closed!');
      this._isWebSocketOpen.next(false);
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

  generateKeypair(callback) {
    return this.send(
      {
        method: 'get_or_generate_keypair'
      },
      callback
    );
  }

  encrypt(public_key_bytes, plaintext, callback) {
    return this.send(
      {
        method: 'encrypt',
        params: JSON.stringify({
          public_key_bytes: public_key_bytes,
          plaintext: plaintext
        })
      },
      callback
    );
  }

  decrypt(ciphertext, callback) {
    return this.send(
      {
        method: 'decrypt',
        params: JSON.stringify({
          ciphertext: ciphertext
        })
      },
      callback
    );
  }

  sign(message, callback) {
    return this.send(
      {
        method: 'sign',
        params: JSON.stringify({
          message: message
        })
      },
      callback
    );
  }

  verify(public_key_bytes, message, signature, callback) {
    return this.send(
      {
        method: 'verify',
        params: JSON.stringify({
          public_key_bytes: public_key_bytes,
          message: message,
          signature: signature
        })
      },
      callback
    );
  }

  whiteflag_encode(message, callback) {
    return this.send(
      {
        method: 'whiteflag_encode',
        params: JSON.stringify(message)
      },
      callback
    );
  }

  whiteflag_decode(message, callback) {
    this.send(
      {
        method: 'whiteflag_decode',
        params: message
      },
      callback
    );
  }
}
