import { Component } from '@angular/core';
import { HeaderComponent } from './header.component';
import {DocumentsComponent} from './documents/documents.component';
import { ContactsComponent } from './contacts/contacts.component';
import {MessageListComponent} from './messages/message-list/message-list.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DropdownDirective } from './dropdown.directive';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [
    HeaderComponent,
    DocumentsComponent,
    ContactsComponent,
    MessageListComponent,
    CommonModule,
    FormsModule,
  ]
})
export class AppComponent {
  title = 'cms';

  selectedFeature: string = 'documents';

  switchView(feature: string) {
    this.selectedFeature = feature;
    console.log('Selected feature:', this.selectedFeature);
  }
}


