import { Injectable, EventEmitter } from '@angular/core';
import { Contact } from './contact.model';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class ContactService {
  contacts: Contact[] = [];
  private url = 'http://localhost:3000/contacts';

  //new eventEmitter to serve the contact list, contact detail and contact item components
  contactSelectedEvent = new EventEmitter<Contact>();
  contactChangedEvent = new EventEmitter<Contact[]>();
  contactListChangedEvent = new Subject<Contact[]>();


  constructor(
    private http: HttpClient
  ) {
  }

  getContacts() {
    this.http.get<any>(this.url).subscribe(
      (response) => {
        console.log('Raw server response:', response);

        // Check if response has the expected structure
        if (response && response.obj) {
          this.contacts = response.obj || [];
        } else if (Array.isArray(response)) {
          this.contacts = response;
        } else {
          this.contacts = [];
        }

        console.log('Processed contacts array:', this.contacts);
        this.sortAndSend();
      },
      (error) => {
        console.error('Error fetching contacts:', error);
      }
    );
  }

  getContact(id: string): Contact | null {
    for (let contact of this.contacts) {
      if (contact.id === id) {
        return contact;
      }
    }
    return null;
  }

  deleteContact(contact: Contact) {
    if (!contact) {
      return;
    }
    const pos = this.contacts.findIndex(c => c.id === contact.id);
    if (pos < 0) {
      return;
    }
    this.http.delete(`${this.url}/${contact.id}`).subscribe(
      (response: Response) => {
        this.contacts.splice(pos, 1);
        this.sortAndSend();
      },
      (error) => {
        console.error('Error deleting contact:', error);
      }
    );
  }

  addContact(Contact: Contact) {
    if (!Contact) {
      return;
    }
    Contact.id = '';
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.post<Contact>(this.url, Contact, { headers: headers }).subscribe(
      (newContact: Contact) => {
        this.contacts.push(newContact);
        this.sortAndSend();
      },
      (error: any) => {
        console.error('Error adding contact:', error);
      }
    );
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact) {
      return;
    }
    const pos = this.contacts.indexOf(originalContact);
    if (pos < 0) {
      return;
    }
    newContact.id = originalContact.id;
    newContact._id = originalContact._id;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.put<Contact>(`${this.url}/${originalContact.id}`, newContact, { headers: headers })
      .subscribe(
        (responseData) => {
          this.contacts[pos] = responseData;
          this.sortAndSend();
        },
        (error: any) => {
          console.error('Error updating contact:', error);
        }
      );
  }

  private sortAndSend() {
    // Add safety check for sorting
    this.contacts = this.contacts.filter(contact => contact && contact.name);
    this.contacts.sort((a, b) => {
      const nameA = a.name || '';
      const nameB = b.name || '';
      return nameA.localeCompare(nameB);
    });
    this.contactListChangedEvent.next(this.contacts.slice());
  }


}
