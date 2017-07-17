import { Pipe, PipeTransform } from '@angular/core';
import {Contact} from "./contact.model";

@Pipe({
  name: 'contactsFilter'
})
export class ContactsFilterPipe implements PipeTransform {

  transform(contacts: Contact[], term) {
    let filteredArray: Contact[] = contacts;

    filteredArray = contacts.filter(
      (contact: Contact) => contact.name.toLowerCase().includes(term)
    );

    if (filteredArray.length < 1) {
      return contacts;
    }

    return filteredArray;
  }

}
