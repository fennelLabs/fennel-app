export default class IPFSService {
  constructor(ipfs) {
    this._ipfs = ipfs;
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
    const encoded_content = this._encoder.encode(content);
    const cid = await this._ipfs.block.put(encoded_content, {
      timeout: 3000,
      pin: true
    });
    return cid;
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