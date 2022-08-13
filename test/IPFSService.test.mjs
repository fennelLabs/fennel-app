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
    block: {
      put: (input) => Promise.resolve(input),
      get: (input) => Promise.resolve(encoder.encode(input)),
      rm: (input) => mySuccessfulAsyncIterable
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
    const decoder = new TextDecoder();
    expect(typeof cid).to.equal('object');
    expect(cid.toString()).to.equal('84,101,115,116');
    expect(decoder.decode(cid)).to.equal('Test');
  });

  it('should getFile()', async () => {
    const str = 'abc';
    const cid = await ipfs.getFile(str);
    expect(cid).to.exist;
  });

  it('should validate decoder', async () => {
    const buffer = new Uint8Array(4)[(84, 101, 115, 116)];
    const str = 'abc';
    const cid = await ipfs.getFile(str);
    expect(typeof cid).to.equal('string');
    expect(cid).to.have.length(3);
    expect(cid.toString()).to.equal('abc');
  });

  it('should delFile()', async () => {
    const str = 'abc';
    const result = await ipfs.delFile(str);
    expect(result).to.be.true;
  });
});
