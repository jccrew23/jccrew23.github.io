import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'app-document-item',
  standalone: true,
  templateUrl: './document-item.component.html',
  styleUrls: ['./document-item.component.css']
  // imports: [DocumentListComponent]
})

export class DocumentItemComponent {
  @Input() document: Document;
  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  onSelected() {
    this.selectedDocumentEvent.emit(this.document);
  }
}
