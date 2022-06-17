import React, {useEffect} from 'react';
import {useServiceContext} from '../contexts/ServiceContext';

function useFennelRPC() {
  const {rpc} = useServiceContext();

  /* useEffect(() => {
    fennelRPC.open();
    return () => {
      fennelRPC.close();
    };
  }, []); */

  return rpc;
}

export default useFennelRPC;
