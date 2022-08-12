// Adapted from JS-IPFS at:
// https://raw.githubusercontent.com/ipfs-examples/js-ipfs-examples/master/examples/browser-create-react-app/src/hooks/use-ipfs-factory.js
import * as IPFS from 'ipfs-core';
import {useEffect, useState} from 'react';
import IPFSService from '../../services/IPFSService/index.js';

let ipfs = null;
let ipfsService = null;

function useIpfsFactory() {
  const [isIpfsReady, setIpfsReady] = useState(!!ipfs);
  const [ipfsInitError, setIpfsInitError] = useState(null);

  useEffect(() => {
    startIpfs();
    return function cleanup() {
      if (ipfs && ipfs.stop) {
        console.log('Stopping IPFS');
        ipfs.stop().catch((err) => console.error(err));
        ipfs = null;
        setIpfsReady(false);
      }
    };
  }, []);

  async function startIpfs() {
    if (ipfs) {
      console.log('IPFS already started');
    } else if (window.ipfs && window.ipfs.enable) {
      console.log('Found window.ipfs');
      ipfs = await window.ipfs.enable({commands: ['id']});
      ipfsService = new IPFSService(ipfs);
    } else {
      try {
        console.time('IPFS Started');
        ipfs = await IPFS.create();
        console.timeEnd('IPFS Started');
      } catch (error) {
        console.error('IPFS init error:', error);
        ipfs = null;
        setIpfsInitError(error);
      }
    }

    setIpfsReady(Boolean(ipfs));
  }

  return {ipfs, ipfsService, isIpfsReady, ipfsInitError};
}

export default useIpfsFactory;
