import {createContext, useContext} from 'react';
import {MessageService} from '../services';

const ServiceContext = createContext({});

/**
 * @returns {{messageService: MessageService}}
 */
export const useServiceContext = () => useContext(ServiceContext);

export const ServiceContextProvider = ({children}) => {
  // all services get instantiated once and registered into the context provider
  const messageService = new MessageService();

  return (
    <ServiceContext.Provider value={{messageService}}>
      {children}
    </ServiceContext.Provider>
  );
};
