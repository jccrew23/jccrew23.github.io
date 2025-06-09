import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Contact } from '../contact.model';

@Component({
  selector: 'app-contact-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact-item.component.html',
  styleUrl: './contact-item.component.css'
})
export class ContactItemComponent implements OnInit {
  @Input() contact!: Contact;
  @Output() contactSelected = new EventEmitter<void>();

  constructor() { }

  ngOnInit(){ }

  onSelected() {
    this.contactSelected.emit();
  }

}
