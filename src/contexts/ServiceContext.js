import React, {useEffect, useState} from 'react';
import {createContext, useContext} from 'react';
import {MessageService, FennelRPC} from '../services';
import KeyManager from '../services/KeyManager';

const ServiceContext = createContext({});

/**
 * @returns {{messageService: MessageService, rpc: FennelRPC, keymanager: KeyManager}}
 */
export const useServiceContext = () => useContext(ServiceContext);

export const ServiceContextProvider = ({children}) => {
  const [services, setServices] = useState(undefined);

  useEffect(() => {
    // all services get instantiated once and registered into the context provider
    const messageService = new MessageService();
    const rpc = new FennelRPC();
    const keymanager = new KeyManager('Main');

    setServices({messageService, rpc, keymanager});

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
