import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  @Output() selectedFeatureEvent = new EventEmitter<string>();


  onSelected(selectedEvent:string) {
    console.log('HeaderComponent initialized');

    this.selectedFeatureEvent.emit(selectedEvent);
  }
}
