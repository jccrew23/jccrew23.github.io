import { DocumentService } from './../document.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Document } from '../document.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Params } from '@angular/router';

@Component({
  selector: 'app-document-edit',
  standalone: false,
  templateUrl: './document-edit.component.html',
  styleUrl: './document-edit.component.css'
})
export class DocumentEditComponent implements OnInit {
  originalDocument: Document | null = null;
  document: Document = {
    id: '',
    name: '',
    description: '',
    url: ''
  };
  editMode: boolean = false;

  constructor(
    private documentService: DocumentService,
    private router: Router,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const id = params['id'];
      if (id === null || id === undefined) {
        this.editMode = false;
        return;
      }
      this.originalDocument = this.documentService.getDocument(id);
      if (this.originalDocument === null) {
        return;
      }
      this.editMode = true;
      this.document = JSON.parse(JSON.stringify(this.originalDocument)); // Deep copy to avoid reference issues
    });
  }

  // Method to handle form submission
  onSubmit(form: NgForm) {
    const value = form.value;
    const newDocument = new Document(
      value.id,
      value.name,
      value.description,
      value.url);

    if (this.editMode === true) {
      this.documentService.updateDocument(this.originalDocument, newDocument);
    } else {
      this.documentService.addDocument(newDocument);
    }

    this.router.navigate(['/documents']);
  }

  // Method to handle form cancellation
  onCancel() {
    this.router.navigate(['/documents']);
  }
}
