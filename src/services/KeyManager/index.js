import {Keyring} from '@polkadot/api';
import {
  mnemonicGenerate,
  decodeAddress,
  blake2AsHex
} from '@polkadot/util-crypto';
import {stringToU8a, u8aToHex} from '@polkadot/util';

class KeyManager {
  constructor(name) {
    this._name = name; // For debugging.
    this._keyring = new Keyring();
    this._pair = null;
  }

  name() {
    return this._name;
  }

  signer() {
    return this._pair;
  }

  generateAccount(name) {
    console.log(`Generating a wallet with ${this._name}`);
    const mnemonic = mnemonicGenerate(24);

    this._pair = this._keyring.addFromUri(mnemonic, {name: name}, 'sr25519');
    console.log(`Address: ${this._pair.address}`);

    return mnemonic;
  }

  importAccount(name, mnemonic) {
    console.log(`Restoring a wallet with ${this._name}`);
    this._pair = this._keyring.addFromUri(mnemonic, {name: name}, 'sr25519');
    console.log(`Address: ${this._pair.address}`);
    return !!this._pair.address;
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
