import {CLI_URI} from '../config';
import {WebSocketClient} from '../utils/webSocketClient';

export class FennelRPC extends WebSocketClient {
  constructor() {
    super(CLI_URI);
  }

  check(callback) {
    return this.send(
      {
        method: 'hello_there'
      },
      callback
    );
  }

  generateKeypair(callback) {
    return this.send(
      {
        method: 'get_or_generate_keypair'
      },
      callback
    );
  }

  encrypt(public_key_bytes, plaintext, callback) {
    return this.send(
      {
        method: 'encrypt',
        params: JSON.stringify({
          public_key_bytes: public_key_bytes,
          plaintext: plaintext
        })
      },
      callback
    );
  }

  decrypt(ciphertext, callback) {
    return this.send(
      {
        method: 'decrypt',
        params: JSON.stringify({
          ciphertext: ciphertext
        })
      },
      callback
    );
  }

  sign(message, callback) {
    return this.send(
      {
        method: 'sign',
        params: JSON.stringify({
          message: message
        })
      },
      callback
    );
  }

  verify(public_key_bytes, message, signature, callback) {
    return this.send(
      {
        method: 'verify',
        params: JSON.stringify({
          public_key_bytes: public_key_bytes,
          message: message,
          signature: signature
        })
      },
      callback
    );
  }

  whiteflag_encode(message, callback) {
    return this.send(
      {
        method: 'whiteflag_encode',
        params: JSON.stringify(message)
      },
      callback
    );
  }

  whiteflag_decode(message, callback) {
    this.send(
      {
        method: 'whiteflag_decode',
        params: message
      },
      callback
    );
  }
}
