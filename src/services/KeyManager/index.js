import {Keyring} from '@polkadot/api';
import {KeyringPair} from '@polkadot/keyring/types';
import {
  mnemonicGenerate,
  decodeAddress,
  blake2AsHex
} from '@polkadot/util-crypto';
import {stringToU8a, u8aToHex} from '@polkadot/util';
import {BehaviorSubject} from 'rxjs';
import {
  web3Accounts,
  web3Enable,
  web3FromSource
} from '@polkadot/extension-dapp';

class KeyManager {
  /**
   * @type {BehaviorSubject<KeyringPair>}
   * @private
   */
  _pair = new BehaviorSubject(null);
  pair$ = this._pair.asObservable();

  // Added this to bridge the mismatches between the
  // extension's signer type and the Keypair type.
  _address = new BehaviorSubject(null);
  address$ = this._address.asObservable();

  constructor(name) {
    this._name = name; // For debugging.
    this._keyring = new Keyring();
    // If the extension is working, this gets what it needs
    // from that. Otherwise it doesn't do anything and the
    // app works like it did before.
    this.getExtension();
  }

  name() {
    return this._name;
  }

  signer() {
    return this._pair.value;
  }

  address() {
    return this._address.value;
  }

  async getExtension() {
    const extensions = await web3Enable('fennel-labs');
    if (extensions.length === 0) {
      return;
    }
    const allAccounts = await web3Accounts();
    const account = allAccounts[0];
    const injector = await web3FromSource(account.meta.source);
    this._pair.next(injector.signer);
    this._address.next(account.address);
  }

  generateAccount(name) {
    console.log(`Generating a wallet with ${this._name}`);
    const mnemonic = mnemonicGenerate(24);
    this.loadAccount(name, mnemonic);
    return mnemonic;
  }

  importAccount(name, mnemonic) {
    console.log(`Restoring a wallet with ${this._name}`);
    this.loadAccount(name, mnemonic);
    return !!this._pair.value.address;
  }

  sign(message) {
    return u8aToHex(this._pair.value.sign(stringToU8a(message)));
  }

  verify(message, signature, address) {
    const public_key = u8aToHex(decodeAddress(address));
    return this._pair.value.verify(message, signature, public_key);
  }

  hash(data) {
    return blake2AsHex(data);
  }

  /**
   * @private
   */
  loadAccount(name, mnemonic) {
    this._pair.next(
      this._keyring.addFromUri(mnemonic, {name: name}, 'sr25519')
    );
    console.log(`Address: ${this._pair.value.address}`);
    this._address.next(this._pair.value.address);
  }
}

export default KeyManager;
