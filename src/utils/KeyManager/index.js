import {Keyring} from '@polkadot/api';
import {
  mnemonicGenerate,
  decodeAddress,
  blake2AsHex
} from '@polkadot/util-crypto';
import {stringToU8a, u8aToHex} from '@polkadot/util';

class KeyManager {
  constructor() {
    this._keyring = new Keyring({type: 'sr25519', ss58Format: 2});
    this._pair = null;
  }

  signer() {
    return this._pair;
  }

  generateAccount(name) {
    const mnemonic = mnemonicGenerate(24);

    this._pair = this._keyring.addFromUri(mnemonic, {name: name}, 'ed25519');

    return mnemonic;
  }

  importAccount(name, mnemonic) {
    this._pair = this._keyring.addFromUri(mnemonic, {name: name}, 'ed25519');
  }

  sign(message) {
    return u8aToHex(this._pair.sign(stringToU8a(message)));
  }

  verify(message, signature, address) {
    const public_key = u8aToHex(decodeAddress(address));
    return this._pair.verify(message, signature, public_key);
  }

  hash(data) {
    return blake2AsHex(data);
  }
}

export default KeyManager;
