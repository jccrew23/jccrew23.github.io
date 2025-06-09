import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Message } from '../message.model';
import { MessageItemComponent } from '../message-item/message-item.component';
import { MessageEditComponent } from '../message-edit/message-edit.component';

@Component({
  selector: 'app-message-list',
  standalone: true,
  imports: [MessageItemComponent, MessageEditComponent, CommonModule],
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.css'
})
export class MessageListComponent {
  messages: Message[] = [
    new Message(1, 'Hello, how are you?', 'Greetings', 'Jalielle Curtis'),
    new Message(2, 'Angular is awesome!', 'Tech Talk', 'John Doe'),
    new Message(3, 'Let\'s meet for lunch.', 'Lunch Plans', 'Jane Smith'),
    new Message(4, 'Don\'t forget the meeting tomorrow.', 'Reminder', 'Alice Johnson')
  ];

  onAddMessage(message: Message) {
    this.messages.push(message);
  }



}
