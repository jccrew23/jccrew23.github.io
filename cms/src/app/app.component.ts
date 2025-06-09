import { Component } from '@angular/core';
import { HeaderComponent } from './header.component';
import { ContactsComponent } from './contacts/contacts.component';
import { MessageListComponent } from './messages/message-list/message-list.component';
import { DocumentsComponent } from './documents/documents.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [HeaderComponent, ContactsComponent, MessageListComponent, DocumentsComponent, CommonModule],
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cms';

  selectedFeature: string = 'documents';

  switchView(feature: string) {
    this.selectedFeature = feature;
    console.log('Selected feature:', this.selectedFeature);
  }
}


