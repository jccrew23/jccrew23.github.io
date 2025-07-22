import { Component, Input, OnInit, OnDestroy} from '@angular/core';
import { Message } from '../message.model';
import { ContactService } from '../../contacts/contact.service';
import { Contact } from '../../contacts/contact.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-message-item',
  standalone: false,
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css'],
})
export class MessageItemComponent implements OnInit, OnDestroy {
  @Input() message!: Message;
  contacts: Contact[] = [];

  //initialize sender property
  messageSender: string = 'Loading...';
  private contactSubscription!: Subscription;

  constructor(private contactService: ContactService) {}

  ngOnInit() {
    console.log('MessageItemComponent initialized with message:', this.message);

    // Subscribe to contact list changes
    this.contactSubscription = this.contactService.contactListChangedEvent.subscribe(
      (contacts: Contact[]) => {
        this.contacts = contacts;
        console.log('Contacts updated:', this.contacts);
        this.updateMessageSender();
      }
    );

    // Try to get the contact immediately (in case contacts are already loaded)
    this.updateMessageSender();
  }

  private updateMessageSender() {
    console.log('=== DEBUGGING MESSAGE SENDER ===');
    console.log('Looking for sender ID:', this.message.sender);
    console.log('Available contacts:', this.contacts.map(c => ({ id: c.id, name: c.name })));

    const contact = this.contactService.getContact(this.message.sender);
    console.log('Contact found:', contact);

    if (contact) {
      console.log('Contact name:', contact.name);
      this.messageSender = contact.name;
    } else {
      console.log('No contact found for sender ID:', this.message.sender);
      this.messageSender = 'Unknown Sender';
    }
    console.log('Final messageSender:', this.messageSender);
    console.log('=== END DEBUGGING ===');
  }

  ngOnDestroy() {
    if (this.contactSubscription) {
      this.contactSubscription.unsubscribe();
    }
  }

}
