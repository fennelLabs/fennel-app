import React, {useEffect, useState} from 'react';
import {createContext, useContext} from 'react';
import PropTypes from 'prop-types';
import {FennelRPC} from '../services';
import MessageAPIService from '../services/MessageAPI';
import KeyManager from '../services/KeyManager';
import Node from '../services/Node';
import ContactsManager from '../services/ContactsManager.service';
import {ApiPromise} from '@polkadot/api';
import usePolkadotApi from '../views/hooks/usePolkadotApi';

const ServiceContext = createContext({});

/**
 * @returns {{messageService: MessageAPIService, rpc: FennelRPC, keymanager: KeyManager, node: Node, contactsManager: ContactsManager}}
 */
export const useServiceContext = () => useContext(ServiceContext);

export const ServiceContextProvider = ({children}) => {
  const api = usePolkadotApi();
  const [services, setServices] = useState(createServices());

  useEffect(() => {
    setServices(createServices());

    return () => {
      setServices(undefined);
    };
  }, [api]);

  return (
    <ServiceContext.Provider value={services}>
      {children}
    </ServiceContext.Provider>
  );

  function createServices() {
    const rpc = new FennelRPC();
    const messageService = new MessageAPIService(rpc);
    const keymanager = new KeyManager('Main');
    const contactsManager = new ContactsManager();

    const services = {
      messageService,
      rpc,
      keymanager,
      node: undefined,
      contactsManager
    };

    if (api?.isReady) {
      services.node = new Node(api);
    }

    return services;
  }
};

ServiceContextProvider.propTypes = {
  children: PropTypes.element
};
