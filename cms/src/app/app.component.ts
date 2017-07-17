import { Component } from '@angular/core';
import {DocumentsService} from "./documents/documents.service";
import {ContactService} from "./contacts/contact.service";
import {MessageService} from "./messages/message.service";

@Component({
  selector: 'cms-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private documentService: DocumentsService,
              private contactService: ContactService,
              private messageService: MessageService) {}
}
