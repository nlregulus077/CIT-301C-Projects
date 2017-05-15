import {Component, Input, OnInit} from '@angular/core';
import {Message} from "../messages.model";

@Component({
  selector: 'cms-messages-item',
  templateUrl: './messages-item.component.html',
  styleUrls: ['./messages-item.component.css']
})
export class MessagesItemComponent implements OnInit {

  @Input() message: Message;

  constructor() { }

  ngOnInit() {
  }

}
