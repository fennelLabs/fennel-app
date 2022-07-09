import React, {useState, useEffect} from 'react';
import {useServiceContext} from '../../contexts/ServiceContext';

function queryChainConnection() {
  const {connected} = useServiceContext();
  const [isConnected, setIsConnected] = useState(connected.value);

  console.log('is connected inside hook?: ', isConnected);

  useEffect(() => {
    console.log('inside react hook: setting up event callbacks');
    const sub = connected.subscribe((c) => setIsConnected(c));

    return () => {
      sub.unsubscribe();
    };
  }, []);

  return isConnected;
}

export default queryChainConnection;
