import axios from 'axios';

class IPFSClient {
  constructor() {
    this._url = '127.0.0.1:5001';
    this._block_api = 'api/v0/block';
  }

  async get(cid) {
    return axios({
      method: 'get',
      url: `${this._url}/${this._block_api}/get?arg=${cid}`
    });
  }

  async put(content) {
    return axios({
      method: 'post',
      url: `${this._url}/${this._block_api}/put?cid-codec=raw&mhtype=sha2-256&mhlen=-1&pin=false&allow-big-block=false`,
      data: content,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }

  async rm(cid) {
    return axios({
      method: 'get',
      url: `${this._url}/${this._block_api}/rm?arg=${cid}`
    });
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
    const block = await this._ipfs.get(cid);
    return this._decoder.decode(block);
  }

  // Given file content, encodes, submits, verifies, and returns the CID at which the argument is stored.
  async putFile(content) {
    try {
      //const block = await this._ipfs.block.put(buf);
      this._ipfs
        .put(content)
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
