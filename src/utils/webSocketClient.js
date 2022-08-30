import {BehaviorSubject, filter, map, ReplaySubject} from 'rxjs';

export class WebSocketClient {
  /**
   * @type {Number}
   * @private
   */
  _count = 0;

  /**
   * web socket url
   * @private
   */
  _url;

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
   * web socket errors
   * @type {string}
   * @private
   */
  _error = new BehaviorSubject(null);

  /**
   * captures outgoing messages when ws is offline
   * and pushes them through ws when it comes back online
   * @type {Array}
   * @private
   */
  _offlineOutgoingMessageQueue = [];

  constructor(webSocketUrl) {
    this._url = webSocketUrl;

    this._isWebSocketOpen.subscribe((open) => {
      if (open) {
        console.log('RPC WebSocket opened.');

        // sends all messages captured while the websocket was offline
        this._offlineOutgoingMessageQueue.forEach((m) => ws.send(m));
        // reset for next time
        this._offlineOutgoingMessageQueue = [];
      } else {
        this.connect();
      }
    });
  }

  /**
   * @returns {boolean}
   */
  isOpen() {
    return this._isWebSocketOpen.value;
  }

  close() {
    this._ws?.close();
  }

  connect() {
    const ws = new WebSocket(this._url);

    ws.onmessage = (m) => {
      this._incomingMessages.next(JSON.parse(m.data));
    };

    ws.onopen = () => {
      console.log('opened!');
      this._isWebSocketOpen.next(true);
    };

    ws.onerror = (e) => {
      console.log('RPC WebSocket error.');
      console.error(e);
      this._error.next(e);
      this.check();
    };

    ws.onclose = () => {
      console.log('RPC WebSocket closed.');
      this._isWebSocketOpen.next(false);
      this.check();
    };

    this._ws = ws;
  }

  check() {
    console.info('checking ws connection for: ', this._url);
    let connectionIsClosed =
      !this._ws || this._ws.readyState == WebSocket.CLOSED;
    if (connectionIsClosed && this._isWebSocketOpen.value) {
      this._isWebSocketOpen.next(false);
    } else {
      //if (!this._isWebSocketOpen.value) this._isWebSocketOpen.next(true);
    }
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
      throw 'Message queued: websocket is offline.';
    }

    return this._incomingMessages
      .pipe(
        filter((m) => m.id === id),
        map((m) => m.result)
      )
      .subscribe(callback);
  }
}
