import {create} from 'ipfs-http-client';

export default class IPFSService {
  constructor() {
    const auth =
      'Basic ' +
      Buffer.from(
        '2DMn6TctOLnneU2JPp2njs7TnGP' + ':' + 'a638858baeed39f827fd1f697e222306'
      ).toString('base64');
    console.log(auth);

    const client = create({
      host: 'ipfs.infura.io',
      port: 5001,
      protocol: 'https',
      apiPath: '/api/v0',
      headers: {
        'Sec-Fetch-Mode': 'no-cors',
        authorization: auth,
        Origin: 'http://127.0.0.1:3000',
        'User-Agent':
          'Mozilla/5.0 (Linux; Android 4.0.4; Galaxy Nexus Build/IMM76B) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.133 Mobile Safari/535.19'
      }
    });
    this._ipfs = client;
    this._encoder = new TextEncoder();
    this._decoder = new TextDecoder();
  }

  // Given an IPFS CID, returns the material stored at that CID.
  async getFile(cid) {
    const block = await this._ipfs.block.get(cid, {timeout: 3000});
    return this._decoder.decode(block);
  }

  // Given file content, encodes, submits, verifies, and returns the CID at which the argument is stored.
  async putFile(content) {
    const buf = new TextEncoder().encode('a serialized object');
    const decoder = new TextDecoder();
    try {
      //const block = await this._ipfs.block.put(buf);
      this._ipfs.block
        .put(buf)
        .then((success) => {
          console.log('success');
          console.debug(success);
          return success;
        })
        .catch((error) => {
          console.log('error');
          console.debug(error);
        });
      //return cid;
    } catch (error) {
      console.error(error);
    }
  }

  // Given a CID, tries to delete the CID and returns whether the operation succeeded or not.
  // Check the Javascript console to determine the reason for negative returns.
  async delFile(cid) {
    for await (let result of this._ipfs.block.rm(cid, {timeout: 3000})) {
      if (result.error) {
        console.error(
          `Failed to remove block ${result.cid} due to ${result.error.message}`
        );
        return false;
      } else {
        return true;
      }
    }
  }
}
