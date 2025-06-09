import { Component, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'app-message-edit',
  standalone: true,
  templateUrl: './message-edit.component.html',
  styleUrl: './message-edit.component.css'
})
export class MessageEditComponent {
  currentSender: string = 'Jalielle Curtis';
  @ViewChild('msgText') messageInput!: ElementRef;
  @ViewChild('subject') subjectInput!: ElementRef;

  @Output() addMessageEvent = new EventEmitter<Message>();

  onSendMessage() {
    const messageText = this.messageInput.nativeElement.value;
    const subjectText = this.subjectInput.nativeElement.value;

    if (messageText && subjectText) {
      const newMessage = new Message(
        1,
        messageText,
        subjectText,
        this.currentSender
      );

      this.addMessageEvent.emit(newMessage);

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
