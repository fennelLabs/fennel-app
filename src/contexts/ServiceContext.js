import React, {useEffect, useRef, useState} from 'react';
import {createContext, useContext} from 'react';
import PropTypes from 'prop-types';
import {FennelRPC} from '../services';
import MessageAPIService from '../services/MessageAPI';
import KeyManager from '../services/KeyManager';
import Node from '../services/Node';
import ContactsManager from '../services/ContactsManager.service';
import {ApiPromise} from '@polkadot/api';
import connect from '../utils/loadPolkadotApi';

const ServiceContext = createContext({});

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
  const polkadotApi = useRef(connect());
  const rpc = useRef(new FennelRPC());
  const messageService = useRef(new MessageAPIService(rpc));
  const keymanager = useRef(new KeyManager('Main'));
  const contactsManager = useRef(new ContactsManager());
  const node = useRef(new Node(polkadotApi.current));

  return (
    <ServiceContext.Provider
      value={{
        polkadotApi: polkadotApi.current,
        messageService: messageService.current,
        rpc: rpc.current,
        keymanager: keymanager.current,
        node: node.current,
        contactsManager: contactsManager.current
      }}
    >
      {children}
    </ServiceContext.Provider>
  );
};

ServiceContextProvider.propTypes = {
  children: PropTypes.element
};
