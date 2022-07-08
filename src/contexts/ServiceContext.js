import React from 'react';
import {createContext, useContext} from 'react';
import PropTypes from 'prop-types';
import {FennelRPC} from '../services';
import MessageAPIService from '../services/MessageAPI';
import KeyManager from '../services/KeyManager';
import Node from '../services/Node';
import ContactsManager from '../services/ContactsManager.service';
import {ApiPromise} from '@polkadot/api';
import connect from '../utils/loadPolkadotApi';

const polkadotApi = connect();
const rpc = new FennelRPC();
const messageService = new MessageAPIService(rpc);
const keymanager = new KeyManager('Main');
const contactsManager = new ContactsManager();
const node = new Node(polkadotApi);

const services = {
  polkadotApi,
  rpc,
  messageService,
  keymanager,
  contactsManager,
  node
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
 */

/**
 * @returns {ServiceContext}
 */
export const useServiceContext = () => useContext(ServiceContext);

export const ServiceContextProvider = ({children}) => {
  return (
    <ServiceContext.Provider value={services}>
      {children}
    </ServiceContext.Provider>
  );
};

ServiceContextProvider.propTypes = {
  children: PropTypes.element
};
