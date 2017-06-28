import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DocumentsComponent} from './documents/documents.component';
import {MessagesComponent} from './messages/messages.component';
import {ContactsComponent} from './contacts/contacts.component';
import {DocumentsEditComponent} from './documents/documents-edit/documents-edit.component';
import {DocumentsDetailComponent} from './documents/documents-detail/documents-detail.component';
import {ContactEditComponent} from "./contacts/contact-edit/contact-edit.component";
import {ContactsDetailComponent} from "./contacts/contacts-detail/contacts-detail.component";
//import { CommonModule } from '@angular/common';


const app_Routes: Routes = [
  { path: '', redirectTo: '/documents', pathMatch: 'full' },
  { path: 'documents', component: DocumentsComponent, children:[
    {path: 'new', component: DocumentsEditComponent},
    {path: ':id', component: DocumentsDetailComponent},
    {path: ':id/edit', component: DocumentsEditComponent}
  ]},
  { path: 'messages', component: MessagesComponent},
  { path: 'contacts', component: ContactsComponent, children: [
    {path: 'new', component: ContactEditComponent},
    {path: ':id', component: ContactsDetailComponent},
    {path: ':id/edit', component: ContactEditComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(app_Routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
