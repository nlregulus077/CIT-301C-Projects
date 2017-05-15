import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'cms-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() onSelectedEvent = new EventEmitter<string>();

  onSelected (selectedEvent: string) {
    this.onSelectedEvent.emit(selectedEvent);
  }

  constructor() { }

  ngOnInit() {
  }

}
