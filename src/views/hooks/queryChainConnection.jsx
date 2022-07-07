import React, {useState, useEffect} from 'react';
import {useServiceContext} from '../../contexts/ServiceContext';

function queryChainConnection() {
  const {polkadotApi} = useServiceContext();
  const [connected, setConnected] = useState(polkadotApi.isConnected);

  useEffect(() => {
    polkadotApi.on('disconnected', () => {
      setConnected(false);
    });
    polkadotApi.on('connected', () => {
      setConnected(true);
    });
  }, []);

  return connected;
}

export default queryChainConnection;
