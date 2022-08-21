import {expect} from 'chai';
import IPFSService from '../src/services/IPFSService/index.js';

describe('ipfs service', () => {
  const encoder = new TextEncoder();

  const mySuccessfulAsyncIterable = {
    async *[Symbol.asyncIterator]() {
      yield {
        cid: 'abc'
      };
    }
  };

  const mockIpfs = {
    put: (input) => Promise.resolve(input),
    get: (input) => Promise.resolve(encoder.encode(input)),
    rm: (input) => mySuccessfulAsyncIterable
  };

  let ipfs = null;

  beforeEach(async () => {
    ipfs = new IPFSService();
    ipfs._ipfs = mockIpfs;
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

  it('should getFile()', async () => {
    const str = 'abc';
    const cid = await ipfs.getFile(str);
    expect(cid).to.exist;
  });

  it('should delFile()', async () => {
    const str = 'abc';
    const result = await ipfs.delFile(str);
    expect(result).to.be.true;
  });
});
