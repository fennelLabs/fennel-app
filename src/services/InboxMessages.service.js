import {BehaviorSubject, filter} from 'rxjs';
import ContactsManager from './ContactsManager.service';
import MessageAPIService from './MessageAPI';

export default class InboxMessagesService {
  /**
   * @type {MessageAPIService}
   * @private
   */
  _messageApiService;

  /**
   * @type {ContactsManager}
   * @private
   */
  _contactsManager;

  /**
   * @private
   */
  _messages = new BehaviorSubject(undefined);

  messages = {
    $: this._messages.asObservable(),
    current: () => this._messages.value
  };

  constructor(messageApiService, contactsManager) {
    this._messageApiService = messageApiService;
    this._contactsManager = contactsManager;
  }

  reloadMessagesIfSenderSwitches() {
    return this._contactsManager.defaultSender.$.pipe(
      filter((s) => !!s)
    ).subscribe((s) => {
      this._updateMessages(s);
    });
  }

  refreshMessages() {
    const sender = this._contactsManager.defaultSender.current();
    this._updateMessages(sender);
  }

  /**
   * @param {number} sender
   * @returns {Promise<[]>}
   * @private
   */
  _updateMessages(sender) {
    if (!sender) {
      return;
    }
    return this._messageApiService.checkMessages(sender).then((messages) => {
      this._messages.next(messages);
      return messages;
    });
  }
}
