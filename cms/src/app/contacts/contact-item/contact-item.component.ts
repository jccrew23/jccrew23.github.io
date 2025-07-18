import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Contact } from '../contact.model';

@Component({
  selector: 'app-contact-item',
  standalone: false,
  templateUrl: './contact-item.component.html',
  styleUrls: ['./contact-item.component.css']
})
export class ContactItemComponent implements OnInit {
  @Input() contact!: Contact;


  constructor() { }

  ngOnInit(){ }



}
