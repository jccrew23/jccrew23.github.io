import { Injectable, EventEmitter } from '@angular/core';
import { Document } from './document.model';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  documents: Document[] = [];

  private url = 'http://localhost:3000/documents';

  // Event emitter to notify when a document is selected
  documentSelectedEvent = new EventEmitter<Document>();
  documentChangedEvent = new EventEmitter<Document[]>();
  documentListChangedEvent = new Subject<Document[]>();

  constructor(private http: HttpClient) {}

  getDocuments() {
    this.http.get<any>(this.url).subscribe(
      (response) => {
        console.log('Raw server response:', response);

        // Check if response has the expected structure
        if (response && response.obj) {
          this.documents = response.obj || [];
        } else if (Array.isArray(response)) {
          this.documents = response;
        } else {
          this.documents = [];
        }

        console.log('Processed documents array:', this.documents);
        this.sortAndSend();
      },
      (error: any) => {
        console.error('Error fetching documents:', error);
      }
    );
  }

  getDocument(id: string): Document | null {
    for (let document of this.documents) {
      if (document.id === id) {
        return document;
      }
    }
    return null;
  }

  deleteDocument(document: Document) {
    if (!document) {
      return;
    }
    const pos = this.documents.findIndex(d => d.id === document.id);
    if (pos < 0) {
      return;
    }

    this.http.delete(`${this.url}/${document.id}`).subscribe(
      (response: Response) => {
        this.documents.splice(pos, 1);
        this.sortAndSend();
      },
      (error) => {
        console.error('Error deleting document:', error);
      }
    );
  }

  getMaxId(): number {
    let maxId = 0;
    for (let document of this.documents) {
      const currentId = parseInt(document.id);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }
  private sortAndSend() {
    // Add safety check for sorting
    this.documents = this.documents.filter(document => document && document.name);
    this.documents.sort((a, b) => {
      const nameA = a.name || '';
      const nameB = b.name || '';
      return nameA.localeCompare(nameB);
    });
    this.documentListChangedEvent.next(this.documents.slice());
  }

  addDocument(document: Document) {
    if (!document) {
      return;
    }
    document.id = '';

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    console.log('Adding document:', document);

    this.http.post<{message:string, obj: Document}>(this.url, document, { headers: headers })
      .subscribe(
        (responseData) => {
          console.log('Document added successfully:', responseData);
          this.documents.push(responseData.obj);  // Changed from responseData.document to responseData.obj
          this.sortAndSend();
        },
        (error) => {
          console.error('Error adding document:', error);
        }
      );

  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) {
      return;
    }
    const pos = this.documents.findIndex(d => d.id === originalDocument.id);
    if (pos < 0) {
      return;
    }
    newDocument.id = originalDocument.id;
    newDocument._id = originalDocument._id;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.put<{message:string, obj: Document}>(`${this.url}/${originalDocument.id}`, newDocument, { headers: headers })
      .subscribe(
        (responseData) => {
          this.documents[pos] = responseData.obj;  // Changed from responseData.document to responseData.obj
          this.sortAndSend();
        },
        (error) => {
          console.error('Error updating document:', error);
        }
      );
  }

  storeDocuments(){
  const documentsJson = JSON.stringify(this.documents);
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    this.http.put(this.url, documentsJson, { headers: headers })
      .subscribe(
        () => {
          this.documentListChangedEvent.next(this.documents.slice());
        },
        (error: any) => {
          console.error('Error storing documents:', error);
        }
      );
  }
}
