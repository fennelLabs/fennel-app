import axios from 'axios';
import { BehaviorSubject } from 'rxjs';

class MessageAPIService {
    _sent_messages = new BehaviorSubject([]);
    _received_messages = new BehaviorSubject([]);
    _count = 0;

    sent_messages$ = this._sent_messages.asObservable();
    received_message$ = this._received_messages.asObservable();

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
        response = this.__queryHandler(query, variables);
        this.__addSentMessage(response);
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
        response = this.__queryHandler(query, variables);
        this.__populateReceivedMessages(response);
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
        response = this.__queryHandler(query, variables);
        this.__populateSentMessages(response);
    }

    __populateReceivedMessages(data) {
          this._received_messages.next([
                ...this._received_messages.value,
                ...data['data']['messages']
            ]);
    }

    __populateSentMessages(data) {
        data['data']['messages'].forEach(item => {
            this._sent_messages.next([
                ...this._sent_messages.value,
                item
            ]);
        });
    }

    __addSentMessage(data) {
        ++this._count;
        this._sent_messages.next([
            ...this._sent_messages.value,
            data
        ]);
    }

    async __queryHandler(query, variables) {
        try {
            const response = await axios.post('http://localhost:1234', {
                query,
                variables
            });
            console.log(response);
            retval = response.data;
        } catch (error) {
            console.log(error);
            retval = {};
        }
        return JSON.parse(retval);
    }
}

export default MessageAPIService;