import axios from 'axios';
import { BehaviorSubject } from 'rxjs';

class MessageAPIService {
    _messages = new BehaviorSubject([]);
    _count = 0;

    messages$ = this._messages.asObservable();

    sendMessage(message, fingerprint, signature, publicKey, sender_id, recipient_id, message_encryption_indicator_id) {
        const query = `
        mutation createMessageEncryptionIndicator($indicatorInput:CreateMessageEncryptionIndicatorInput!) {
            createMessageEncryptionIndicator(input:$indicatorInput){
                id
                message
                signature
                fingerprint
                publicKey
                sender {
                    id
                }
                recipient {
                    id
                }
            }
          }
        `;
        const variables = {
            "messageInput": {
                "message": message,
                "clientMutationId": "1",
                "fingerprint": fingerprint,
                "signature": signature,
                "publicKey": publicKey,
                "senderId": sender_id,
                "recipientId": recipient_id,
                "messageEncryptionIndicatorId": message_encryption_indicator_id
            }
        };
        this.__queryHandler(query, variables);
    }

    checkMessages(recipientID) {
        const query = `
        query {
            messages(recipient_id: $recipientID) {
                id
                message
                signature
                fingerprint
                publicKey
                sender {
                    id
                }
                recipient {
                    id
                }
            }
        }
        `;
        const variables = {
            "recipientID": recipientID,
        };
        this.__queryHandler(query, variables);
    }

    getSentMessages(senderID) {
        const query = `
        query {
            messages(sender_id: $senderID) {
                id
                message
                signature
                fingerprint
                publicKey
                sender {
                    id
                }
                recipient {
                    id
                }
            }
        }
        `;
        const variables = {
            "senderID": senderID
        };
        this.__queryHandler(query, variables);
    }

    async __queryHandler(query, variables) {
        try {
            const response = await axios.post('http://localhost:1234', {
                query,
                variables
            });
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }
}

export default MessageAPIService;