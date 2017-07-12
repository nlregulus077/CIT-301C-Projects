import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {NgForm} from "@angular/forms";

import {Document} from '../document.model';
import {DocumentsService} from "../documents.service";



@Component({
  selector: 'cms-documents-edit',
  templateUrl: './documents-edit.component.html',
  styleUrls: ['./documents-edit.component.css']
})
export class DocumentsEditComponent implements OnInit {
  document: Document;
  originalDocument: Document;
  editMode: boolean = false;
  id: string;

  constructor(private documentService: DocumentsService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        if (this.id === null) {
          this.editMode = false;
          return;
        }

        this.originalDocument = this.documentService.getDocument(this.id);
        if (this.originalDocument === null) {
          return;
        }

        this.editMode = true;
        this.document = JSON.parse(JSON.stringify(this.originalDocument));
      })
  }

  onSubmit(form: NgForm) {
    let values = form.value;

    let newDocument = new Document(String(this.documentService.maxDocumentId++),
      values.name, values.documentURL, values.description, values.children);

    if (this.editMode) {
      this.documentService.updateDocument(this.originalDocument, newDocument);
    } else {
      this.documentService.addDocument(newDocument);
    }

    this.router.navigate(['documents']);
  }

  onCancel() {
    this.router.navigate(['documents'])
  }

}
