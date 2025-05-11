import { Component } from '@angular/core';
import { HeaderComponent } from './header.component';
import { ContactsComponent } from './contacts/contacts.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [HeaderComponent, ContactsComponent],
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'cms';
}

