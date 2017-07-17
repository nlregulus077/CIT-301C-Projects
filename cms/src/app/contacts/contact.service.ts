import {EventEmitter, Injectable} from '@angular/core';
import { Contact } from "./contact.model";
import {Subject} from "rxjs/Subject";
import {Http, Response} from '@angular/http';

@Injectable()
export class ContactService {

  contactSelected = new EventEmitter<Contact>();
  contactChangedEvent = new EventEmitter<Contact[]>();
  contactListChangedEvent = new Subject<Contact[]>();

  contacts: Contact[] = [];
  public maxContactId: number = 0;

  constructor(private http: Http) {
    this.initContacts();
  }

  getContacts(): Contact[] {
    return this.contacts.slice();
  }

  getContact(id: string): Contact {

    for (let contact of this.contacts) {
      if (contact.id === id)
        return contact;
    }
    return null;
  }

  getMaxId(): number {
    let maxId = 0;
    for (let contact of this.contacts) {
      let currentId = parseInt(contact.id);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  addContact(newContact: Contact) {
    if (newContact === null) {
      return;
    }

    this.maxContactId++;
    newContact.id = this.maxContactId.toString();
    this.contacts.push(newContact);
    this.storeContacts();

  }

  updateContact(originalContact: Contact,
                 newContact: Contact) {
    if (originalContact === null) {
      return;
    }
    else if (newContact === null) {
      return;
    }

    const pos = this.contacts.indexOf(originalContact);

    if (pos < 0) {
      return;
    }

    newContact.id = originalContact.id;
    this.contacts[pos] = newContact;
    this.storeContacts();
  }

  deleteContact (contact: Contact) {
    if (contact === null) {
      return;
    }

    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
      return;
    }

    this.contacts.splice(pos, 1);
    this.storeContacts();
  }

  initContacts() {
    this.http.get('https://cms-project-777d2.firebaseio.com/contacts.json')
      .map(
        (response: Response) => {
          const contacts: Contact[] = response.json();
          return contacts;
        }
      )
      .subscribe(
        (contactsReturned: Contact[]) => {
          this.contacts = contactsReturned;
          this.maxContactId = this.getMaxId();
          this.contactListChangedEvent.next(this.contacts.slice());
        }
      );
  }

  storeContacts() {
    JSON.stringify(this.contacts);
    this.http.put('https://cms-project-777d2.firebaseio.com/contacts.json', this.getContacts())
      .subscribe(
        (response: Response) => {
          this.contactListChangedEvent.next(this.contacts.slice());
        }
      );
  }

}
