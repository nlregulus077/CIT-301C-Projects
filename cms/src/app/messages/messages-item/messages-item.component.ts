import {Component, Input, OnInit} from '@angular/core';
import {Message} from '../messages.model';
import {ContactService} from '../../contacts/contact.service';
import {Contact} from '../../contacts/contact.model';

@Component({
  selector: 'cms-messages-item',
  templateUrl: './messages-item.component.html',
  styleUrls: ['./messages-item.component.css']
})
export class MessagesItemComponent implements OnInit {

  @Input() message: Message;
  messageSender: string = null;


  constructor(private contactService: ContactService) { }

  ngOnInit() {
    let contact: Contact = this.contactService.getContact(this.message.sender);
    this.messageSender = contact.name;
  }

}
