import React, { useState, useEffect } from 'react';
import { useServiceContext } from '../../contexts/ServiceContext';

function QueryChainConnection() {
  const { connected } = useServiceContext();
  const [isConnected, setIsConnected] = useState(connected.value());

  useEffect(() => {
    const sub = connected.$.subscribe((c) => setIsConnected(c));

    return () => {
      sub.unsubscribe();
    };
  }, [connected.$]);

  return isConnected;
}

export default QueryChainConnection;
