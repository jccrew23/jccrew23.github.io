import { Component } from '@angular/core';
import { DocumentListComponent } from './document-list/document-list.component';
import { DocumentItemComponent } from './document-item/document-item.component';

@Component({
  selector: 'app-documents',
  standalone: true,
  imports: [DocumentListComponent, DocumentItemComponent],
  templateUrl: './documents.component.html',
  styleUrl: './documents.component.css'
})
export class DocumentsComponent {

}
