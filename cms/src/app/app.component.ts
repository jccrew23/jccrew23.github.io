import { Component, OnInit } from '@angular/core';
import { ContactService } from './contacts/contact.service';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'cms';

  constructor(private contactService: ContactService) {}

  ngOnInit() {
    // Load contacts when the app starts so they're available everywhere
    this.contactService.getContacts();
  }
}


