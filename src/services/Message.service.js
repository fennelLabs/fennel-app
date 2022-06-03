import {BehaviorSubject} from 'rxjs';

class MessageService {
  _messages = new BehaviorSubject([]);
  _count = 0;

  constructor() {
    this.queueTestMessages();
  }

  get messages() {
    return this._messages.asObservable();
  }

  sendMessage() {
    ++this._count;
    this._messages.next([
      ...this._messages.value,
      {id: this._count, name: `message${this._count}`}
    ]);
  }

  queueTestMessages() {
    if (this._count > 4) return;

    this.sendMessage();

    setTimeout(() => {
      this.queueTestMessages();
    }, 3_000);
  }
}

export default MessageService;
