import { Component, OnInit, OnDestroy } from '@angular/core';
import { Document } from './document.model';
import { DocumentService } from './document.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-documents',
  standalone: false,
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit, OnDestroy {  // <== Add OnDestroy here
  selectedDocument!: Document;
  documents: Document[] = [];

  private subscription!: Subscription; // <== class variable

  constructor(private documentService: DocumentService) {
    this.documentService.documentSelectedEvent.subscribe(
      (document: Document) => {
        this.selectedDocument = document;
      }
    );
  }

  ngOnInit(): void {
    this.subscription = this.documentService.documentListChangedEvent.subscribe(
      (documentsList: Document[]) => {
        this.documents = documentsList;
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
