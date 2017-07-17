import { Component, OnInit } from '@angular/core';
import {Message} from '../messages.model';
import {MessageService} from '../message.service';

@Component({
  selector: 'cms-messages-list',
  templateUrl: './messages-list.component.html',
  styleUrls: ['./messages-list.component.css']
})
export class MessagesListComponent implements OnInit {

  messages: Message[] = [];

  constructor(private messageService: MessageService) {
    this.messages = messageService.getMessages();
  }

  ngOnInit() {
    this.messageService.messageListChangedEvent
      .subscribe(
        (messages: Message[]) => {
          this.messages = messages;
        }
      );
  }

  onAddMessage(message:Message) {
    this.messages.push(message);
  }

}
