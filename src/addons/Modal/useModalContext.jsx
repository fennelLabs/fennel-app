import { useState, createContext } from 'react';
import ModalDisplay from './ModalDisplay';

export const ModalContext = createContext({});

function useModalContext() {
  const [name, setName] = useState(undefined);

  // this might be better implemented using observable in RxJS
  //const [{ onOpen, onClose }, setOptions] = useState(optionsDefault);

  return {
    state: {
      name,
      isShowing: name !== undefined,
    },
    controls: { close },
    getModalHandle: (name) => {
      return { open: () => open(name), close };
    },
  };

  function open(name) {
    //onOpen && onOpen();
    setName(name);
  }

  function close() {
    //onClose && onClose();
    setName(undefined);
  }
}

export default function () {
  const { getModalHandle, ...context } = useModalContext();
  return {
    getModalHandle,
    ModalContextProvider: () => (
      <ModalContext.Provider value={context}>
        <ModalDisplay name={context.state.name} />
      </ModalContext.Provider>
    ),
  };
}
