import { Injectable, EventEmitter } from '@angular/core';
import { Message } from './message.model';
// import { MOCKMESSAGES } from './MOCKMESSAGES';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  // emit event to notify components of changes
  messageChangedEvent = new EventEmitter<Message[]>();

  messages: Message[] = [];
  maxMessageId: number;
  private url = 'https://cmsbyui25-default-rtdb.firebaseio.com/messages.json';

  constructor(private http: HttpClient) {}

  getMessages() {
    this.http.get<Message[]>(this.url).subscribe(
      (messages: Message[]) => {
        this.messages = messages;
        this.maxMessageId = this.getMaxId();
        this.messages.sort((a, b) => a.subject.localeCompare(b.subject));
        this.messageChangedEvent.emit(this.messages.slice());
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
        this.messageChangedEvent.emit(this.messages.slice());
      },
      (error: any) => {
        console.error('Error storing messages:', error);
      }
    );
  }
}
