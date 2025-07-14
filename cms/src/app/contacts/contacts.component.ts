import { Component, OnInit, OnDestroy} from '@angular/core';
import { Contact } from './contact.model';
import { ContactService } from './contact.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-contacts',
  standalone: false,
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})

export class ContactsComponent implements OnInit, OnDestroy {
  selectedContact: Contact;
  contacts: Contact[] = [];

  private subscription!: Subscription;

  constructor(private contactService: ContactService) { }

  ngOnInit() {
    this.subscription = this.contactService.contactSelectedEvent.subscribe(
      (contact: Contact) => {
        this.selectedContact = contact;
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


}

