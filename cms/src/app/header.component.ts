import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownDirective } from './dropdown.directive';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [CommonModule, DropdownDirective]
})
export class HeaderComponent {

  @Output() selectedFeatureEvent = new EventEmitter<string>();


  onSelected(selectedEvent:string) {
    console.log('HeaderComponent initialized');

    this.selectedFeatureEvent.emit(selectedEvent);
  }
}
