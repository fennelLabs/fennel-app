import React, {useEffect, createContext, useContext} from 'react';
import PropTypes from 'prop-types';
import {FennelRPC} from '../services';
import MessageAPIService from '../services/MessageAPI';
import KeyManager from '../services/KeyManager';
import Node from '../services/Node';
import ContactsManager from '../services/ContactsManager.service';
import {ApiPromise} from '@polkadot/api';
import connect, {listenForConnection} from '../utils/loadPolkadotApi';
import AccountBalanceService from '../services/AccountBalance.service';
import {Observable} from 'rxjs';
import InboxMessagesService from '../services/InboxMessages.service';

const {promise, rxjs} = connect();
const connected = listenForConnection(rxjs);
const rpc = new FennelRPC();
const messageService = new MessageAPIService(rpc);
const keymanager = new KeyManager('Main');
const contactsManager = new ContactsManager();
const node = new Node(promise);
const accountBalanceService = new AccountBalanceService(rxjs, keymanager);

export const inboxMessagesService = new InboxMessagesService(
  messageService,
  contactsManager
);

const services = {
  polkadotApi: promise,
  connected,
  rpc,
  messageService,
  keymanager,
  contactsManager,
  node,
  accountBalanceService
};

const ServiceContext = createContext(services);

/**
 * <description>
 * @typedef {Object} ServiceContext
 * @property {MessageAPIService} messageService <description>
 * @property {FennelRPC} rpc
 * @property {KeyManager} keymanager
 * @property {Node} node
 * @property {ContactsManager} contactsManager
 * @property {ApiPromise} polkadotApi
 * @property {{$: Observable<boolean>, value: () => boolean}} connected
 * @property {AccountBalanceService} accountBalanceService
 */

/**
 * @returns {ServiceContext}
 */
export const useServiceContext = () => useContext(ServiceContext);

export const ServiceContextProvider = ({children}) => {
  useEffect(() => {
    promise.isReady;
    rxjs.isReady;

    const subscriptions = [
      accountBalanceService.listenForBalanceChanges(),
      inboxMessagesService.reloadMessagesIfSenderSwitches()
    ];

    return () => {
      subscriptions.forEach((s) => {
        s.unsubscribe();
      });
    };
  }, []);

  return (
    <ServiceContext.Provider value={services}>
      {children}
    </ServiceContext.Provider>
  );
};

ServiceContextProvider.propTypes = {
  children: PropTypes.element
};
