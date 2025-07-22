import { Component, Output, EventEmitter } from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-document-list',
  standalone: false,
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css'],
})
export class DocumentListComponent {

  documents: Document[] = [];
  maxDocumentId: number;

  constructor(private documentService: DocumentService) {}

  ngOnInit() {
    this.documentService.documentChangedEvent.subscribe(
          (documents: Document[]) => {
            this.documents = documents;
          }
        );

    this.documentService.documentListChangedEvent.subscribe(
      (documentsList: Document[]) => {
        this.documents = documentsList;
      }
    );

    this.documentService.getDocuments();
  }

}
