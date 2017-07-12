import { Component, OnInit } from '@angular/core';
import {Contact} from "../contact.model";
import {ContactService} from "../contact.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {FormControl, FormGroup, NgForm, Validators} from "@angular/forms";

@Component({
  selector: 'cms-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {
  contact: Contact;
  originalContact: Contact;
  groupContacts: Contact[] = [];
  editMode: boolean = false;
  hasGroup: boolean = false;
  id: string;
  invalidGroupContact: boolean;
  contactForm: FormGroup;

  constructor(private contactService: ContactService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        if (this.id === null) {
          this.editMode = false;
          return;
        }

        this.originalContact = this.contactService.getContact(this.id);
        if (this.originalContact === null) {
          return;
        }

        this.editMode = true;
        this.contact = JSON.parse(JSON.stringify(this.originalContact));

        if (this.contact.group && this.contact.group.length > 0) {
          this.groupContacts = this.contact.group.slice();
        }

        this.initForm();
      })

  }

  private initForm() {
    let contactName = '';
    let contactEmail = '';
    let contactPhone = '';
    let contactImageUrl = '';

    if (this.editMode) {
      let contact = this.contactService.getContact(this.id);

      contactName = contact.name;
      contactEmail = contact.email;
      contactPhone = contact.phone;
      contactImageUrl = contact.imageUrl;
    }

    this.contactForm = new FormGroup({
      'name' : new FormControl(contactName, Validators.required),
      'email' : new FormControl(contactEmail, Validators.required),
      'phone' : new FormControl(contactPhone),
      'imageUrl' : new FormControl(contactImageUrl)
    })
  }

  onSubmit(form: NgForm) {
    let values = form.value;

    let newContact = new Contact(String(this.contactService.maxContactId), values.name, values.email,
    values.phone, values.imageUrl, values.group);

    if (this.editMode) {
      this.contactService.updateContact(this.originalContact, newContact);
    } else {
      this.contactService.addContact(newContact);
    }

    this.router.navigate(['contacts']);
  }

  onCancel() {
    this.router.navigate(['contacts']);
  }

  isInvalidContact(newContact: Contact) {
    if (!newContact) {
      return true;
    }

    if (newContact.id === this.contact.id) {
      return true;
    }

    for (let i = 0; i < this.groupContacts.length; i++) {
      if (newContact.id === this.groupContacts[i].id) {
        return true;
      }
    }

    return false;
  }

  addToGroup($event: any) {
    let selectedContact: Contact = $event.dragData;
    this.invalidGroupContact = this.isInvalidContact(selectedContact);

    if (this.invalidGroupContact) {
      return;
    }

    this.groupContacts.push(selectedContact);
    this.invalidGroupContact = false;
  }

  onRemoveItem(idx: number) {
    if (idx < 0 || idx >= this.groupContacts.length) {
      return;
    }

    this.groupContacts.splice(idx, 1);
    this.invalidGroupContact = false;
  }
}
