import React, {useEffect, createContext, useContext} from 'react';
import PropTypes from 'prop-types';
import {FennelRPC} from '../services';
//import IPFSService from '../services/IPFSService';
import useIpfsFactory from '../views/hooks/useIpfsFactory';
import MessageAPIService from '../services/MessageAPI';
import KeyManager from '../services/KeyManager';
import Node from '../services/Node';
import ContactsManager from '../services/ContactsManager.service';
import {ApiPromise} from '@polkadot/api';
import connect, {listenForConnection} from '../utils/loadPolkadotApi';
import AccountBalanceService from '../services/AccountBalance.service';
import {Observable} from 'rxjs';
import IPFSService from '../services/IPFSService';

const {promise, rxjs} = connect();
const connected = listenForConnection(rxjs);
const rpc = new FennelRPC();
const messageService = new MessageAPIService(rpc);
const keymanager = new KeyManager('Main');
const contactsManager = new ContactsManager();
const node = new Node(promise);
const accountBalanceService = new AccountBalanceService(rxjs, keymanager);
//const ipfs = new IPFSService();

const services = {
  polkadotApi: promise,
  connected,
  rpc,
  messageService,
  keymanager,
  contactsManager,
  node,
  accountBalanceService,
  //ipfs
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
    const sub = accountBalanceService.listenForBalanceChanges();
    return () => {
      sub.unsubscribe();
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
