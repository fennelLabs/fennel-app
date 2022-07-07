import {ApiPromise} from '@polkadot/api';
import React, {useEffect, useState} from 'react';
import connect from '../../utils/loadPolkadotApi';

/**
 *
 * @returns {ApiPromise}
 */
function usePolkadotApi() {
  const [api, setApi] = useState(undefined);

  useEffect(() => {
    connect().then((api) => {
      setApi(api);
      api.on('disconnected', () => {
        setApi(undefined);
      });
    });
  }, []);

  return api;
}

export default usePolkadotApi;
