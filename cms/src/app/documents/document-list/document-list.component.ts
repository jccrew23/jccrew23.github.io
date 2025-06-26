import { Component, Output, EventEmitter } from '@angular/core';
import { Document } from '../document.model';
import { DocumentItemComponent } from '../document-item/document-item.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-document-list',
  standalone: true,
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css'],
  imports: [DocumentItemComponent, CommonModule]
})
export class DocumentListComponent {
  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  documents: Document[] = [
    { id:1, name: 'Project Proposal', description: 'A proposal for the new project', url: 'https://example.com/proposal.pdf' },
    { id:2, name: 'Meeting Notes', description: 'Notes from the last meeting', url: 'https://example.com/meeting-notes.docx' },
    { id:3, name: 'Budget Report', description: 'Annual budget report', url: 'https://example.com/budget-report.xlsx' },
    { id:4, name: 'User Guide', description: 'Guide for using the application', url: 'https://example.com/user-guide.pdf' }
  ];

  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }
}
