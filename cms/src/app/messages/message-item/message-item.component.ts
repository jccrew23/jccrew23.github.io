import { Component, Input, OnInit} from '@angular/core';
import { Message } from '../message.model';
import { ContactService } from '../../contacts/contact.service';
import { Contact } from '../../contacts/contact.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-message-item',
  standalone: true,
  templateUrl: './message-item.component.html',
  styleUrl: './message-item.component.css',
  imports: [CommonModule]
})
export class MessageItemComponent {
  @Input() message!: Message;

  //initialize sender property
  messageSender: string;

  constructor(private contactService: ContactService) {}

  ngOnInit() {
    //get sender name from contact service
    console.log('MessageItemComponent initialized with message:', this.message);
    const contact: Contact = this.contactService.getContact(this.message.sender);
    this.messageSender = contact.name;
  }

}
