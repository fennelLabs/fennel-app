import React, {useEffect, useState} from 'react';
import {rpc} from '../../contexts/ServiceContext';
import {FennelRPC} from '../../services';

/**
 * returns the rpc instance and a boolean indicating the state of the web socket connection
 * @returns {{open: boolean, rpc: FennelRPC}}
 */
function useFennelRPC() {
  const [open, setOpen] = useState(rpc.isOpen());

  useEffect(() => {
    const sub = rpc.isWebSocketOpen$.subscribe((isOpen) => {
      console.log('subscription update: ', isOpen);
      setOpen(isOpen);
    });
    return () => {
      sub.unsubscribe();
    };
  }, []);

  return {open, rpc};
}

export default useFennelRPC;
