import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Contact } from '../contact.model';

@Component({
  selector: 'app-contact-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact-detail.component.html',
  styleUrl: './contact-detail.component.css'
})
export class ContactDetailComponent implements OnInit {
  @Input() contact!: Contact;

  constructor() { }

  ngOnInit() {

  }
}

