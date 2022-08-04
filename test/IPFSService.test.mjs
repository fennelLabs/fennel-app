import {expect} from 'chai';
import IPFSService from '../src/services/IPFSService/index.js';

describe('ipfs service', () => {
  const mockIpfs = {
    block: {
      put: (input) => Promise.resolve(input),
      get: (input) => Promise.resolve(input)
    }
  };

  let ipfs = null;

  beforeEach(async () => {
    ipfs = new IPFSService(mockIpfs);
  });

  afterEach(async () => {
    ipfs = null;
  });

  it('mock service should be created', () => {
    expect(ipfs).to.exist;
  });

  it('should putFile()', async () => {
    const cid = await ipfs.putFile('Test');
    expect(cid).to.exist;
  });

  it('should validate encoder', async () => {
    const cid = await ipfs.putFile('Test');
    expect(cid).to.have.length(4);
    expect(typeof cid).to.equal('object');
    expect(cid.toString()).to.equal('84,101,115,116');
  });

  it('should getFile()', async () => {
    //const buffer = new Uint8Array(4)[(84, 101, 115, 116)];
    const cid = await ipfs.getFile('some-cid');
    console.debug(cid);
    expect(cid).to.exist;
  });



});
