import {Component, OnInit } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {

  contacts: Contact[] = [];
  subscription: Subscription;
  term: string;

  constructor(private contactService: ContactService) {
    this.contacts = contactService.getContacts();
  }

  ngOnInit() {
    this.contactService.contactChangedEvent.subscribe((contacts: Contact[]) =>
      this.contacts = contacts);

    this.subscription = this.contactService.contactListChangedEvent
      .subscribe((contactsList: Contact[]) =>
        this.contacts = contactsList);
  }

  onKeyPress(value: string) {
    this.term = value;
  }


}
