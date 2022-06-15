import React from 'react';
import {createContext, useContext} from 'react';
import {MessageService} from '../services';
import KeyManager from '../services/KeyManager';

const ServiceContext = createContext({});

/**
 * @returns {{messageService: MessageService}}
 */
export const useServiceContext = () => useContext(ServiceContext);

export const ServiceContextProvider = ({children}) => {
  // all services get instantiated once and registered into the context provider
  const messageService = new MessageService();
  const keymanager = new KeyManager('Main');

  return (
    <ServiceContext.Provider value={{messageService, keymanager}}>
      {children}
    </ServiceContext.Provider>
  );
};
