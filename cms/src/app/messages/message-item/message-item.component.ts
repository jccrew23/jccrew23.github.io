import { Component, Input, OnInit} from '@angular/core';
import { Message } from '../message.model';
import { ContactService } from '../../contacts/contact.service';
import { Contact } from '../../contacts/contact.model';

@Component({
  selector: 'app-message-item',
  standalone: false,
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css'],
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
