import React, {useEffect, useState} from 'react';
import {createContext, useContext} from 'react';
import {FennelRPC} from '../services';
import MessageAPIService from '../services/MessageAPI';
import KeyManager from '../services/KeyManager';
import Node from '../services/Node';

const ServiceContext = createContext({});

/**
 * @returns {{messageService: MessageAPIService, rpc: FennelRPC, keymanager: KeyManager, node: Node}}
 */
export const useServiceContext = () => useContext(ServiceContext);

export const ServiceContextProvider = ({children}) => {
  const [services, setServices] = useState(undefined);

  useEffect(() => {
    // all services get instantiated once and registered into the context provider
    const node = new Node();
    const rpc = new FennelRPC();
    const messageService = new MessageAPIService(rpc);
    const keymanager = new KeyManager('Main');

    setServices({messageService, rpc, keymanager, node});

    return () => {
      setServices(undefined);
    };
  }, []);

  return (
    <ServiceContext.Provider value={services}>
      {children}
    </ServiceContext.Provider>
  );
};
