import axios from 'axios';

class IPFSClient {
  constructor() {
    this._url = 'http://127.0.0.1:5001';
    this._block_api = 'api/v0/block';
  }

  async get(cid) {
    return axios({
      method: 'post',
      url: `${this._url}/${this._block_api}/get?arg=${cid}`
    })
      .then((success) => {
        console.log(success);
        return success['data'];
      })
      .catch((error) => {
        console.log('error');
        console.log(error);
        return null;
      });
  }

  async put(content) {
    const data = new FormData();
    data.append('data', content);
    return axios({
      method: 'post',
      url: `${this._url}/${this._block_api}/put?cid-codec=raw&mhtype=sha2-256&mhlen=-1&pin=false&allow-big-block=false`,
      data: data
    })
      .then((success) => {
        console.log(success);
        return success['data']['Key'];
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  }

  async rm(cid) {
    return axios({
      method: 'get',
      url: `${this._url}/${this._block_api}/rm?arg=${cid}`
    })
      .then(() => true)
      .catch(() => false);
  }
}

export default class IPFSService {
  constructor() {
    this._ipfs = new IPFSClient();
    this._encoder = new TextEncoder();
    this._decoder = new TextDecoder();
  }

  // Given an IPFS CID, returns the material stored at that CID.
  async getFile(cid) {
    return await this._ipfs.get(cid);
  }

  // Given file content, encodes, submits, verifies, and returns the CID at which the argument is stored.
  async putFile(content) {
    return await this._ipfs
      .put(content)
      .then((success) => {
        console.log('success');
        console.debug(success);
        return success;
      })
      .catch((error) => {
        console.log('error');
        console.debug(error);
        return null;
      });
  }

  // Given a CID, tries to delete the CID and returns whether the operation succeeded or not.
  // Check the Javascript console to determine the reason for negative returns.
  async delFile(cid) {
    for await (let result of this._ipfs.rm(cid)) {
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
