import { Component } from '@angular/core';
import { DocumentDetailComponent } from './document-detail/document-detail.component';
import { DocumentListComponent } from './document-list/document-list.component';
import { Document } from './document.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-documents',
  standalone: true,
  imports: [DocumentListComponent, DocumentDetailComponent, CommonModule],
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent {
  selectedDocument!: Document;

}
