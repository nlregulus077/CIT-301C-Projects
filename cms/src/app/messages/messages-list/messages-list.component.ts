import { Component, OnInit } from '@angular/core';
import {Message} from "../messages.model";

@Component({
  selector: 'cms-messages-list',
  templateUrl: './messages-list.component.html',
  styleUrls: ['./messages-list.component.css']
})
export class MessagesListComponent implements OnInit {

  messages: Message[] =
    [
      new Message (null, 'Homework', 'Make sure you do it', 'Anonymous'),
      new Message (null, 'Help', 'Well then help me!', 'Friend')
    ];

  constructor() { }

  ngOnInit() {
  }

  onAddMessage(message:Message) {
    this.messages.push(message);
  }

}
