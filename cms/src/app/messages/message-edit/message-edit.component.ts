import { Component, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';
import { Contact } from '../../contacts/contact.model';

@Component({
  selector: 'app-message-edit',
  standalone: true,
  templateUrl: './message-edit.component.html',
  styleUrl: './message-edit.component.css'
})
export class MessageEditComponent {
  currentSender: string = '3'; // Example sender ID, replace with actual logic to get current user ID
  @ViewChild('msgText') messageInput!: ElementRef;
  @ViewChild('subject') subjectInput!: ElementRef;

  constructor(private messageService: MessageService) {}

  onSendMessage() {
    const messageText = this.messageInput.nativeElement.value;
    const subjectText = this.subjectInput.nativeElement.value;

    if (messageText && subjectText) {
      const newMessage = new Message(
        '1',
        messageText,
        subjectText,
        this.currentSender
      );
      console.log('New message created:', newMessage);

      // Add the new message to the message service
      this.messageService.addMessage(newMessage);

      this.onClear();

    } else {
      alert('Please fill in both the message and subject fields.');
    }
  }

  onClear() {
    this.messageInput.nativeElement.value = '';
    this.subjectInput.nativeElement.value = '';
  }

}
