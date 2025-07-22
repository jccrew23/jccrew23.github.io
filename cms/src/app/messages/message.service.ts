import { Injectable, EventEmitter } from '@angular/core';
import { Message } from './message.model';
// import { MOCKMESSAGES } from './MOCKMESSAGES';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  // emit event to notify components of changes
  messageChangedEvent = new Subject<Message[]>();

  messages: Message[] = [];
  maxMessageId: number;
  private url = 'https://cmsbyui25-default-rtdb.firebaseio.com/messages.json';

  constructor(private http: HttpClient) {}

  getMessages() {
    this.http.get<any>(this.url).subscribe(
      (messagesData: any) => {
        console.log('Raw messages data from Firebase:', messagesData);

        if (messagesData) {
          // Convert Firebase object to array
          this.messages = Object.keys(messagesData).map(key => {
            const message = messagesData[key];
            // Ensure the message has an id property
            if (!message.id) {
              message.id = key;
            }
            return message;
          });
        } else {
          this.messages = [];
        }

        console.log('Processed messages array:', this.messages);
        this.maxMessageId = this.getMaxId();
        this.messages.sort((a, b) => a.subject.localeCompare(b.subject));
        this.messageChangedEvent.next(this.messages.slice());
      },
      (error: any) => {
        console.error('Error fetching messages:', error);
      }
    );
  }

  getMessage(id: string): Message | null {
    for (let message of this.messages) {
      if (message.id === id) {
        return message;
      }
    }
    return null;
  }

  addMessage(message: Message) {
    if (!message) return;

    this.maxMessageId++;
    message.id = this.maxMessageId.toString();
    this.messages.push(message);
    this.storeMessages();
  }

  getMaxId(): number {
    let maxId = 0;
    for (let message of this.messages) {
      let currentId = parseInt(message.id, 10);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  storeMessages() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const messages = JSON.stringify(this.messages);
    this.http.put(this.url, messages, { headers: headers }).subscribe(
      () => {
        this.messageChangedEvent.next(this.messages.slice());
      },
      (error: any) => {
        console.error('Error storing messages:', error);
      }
    );
  }
}
