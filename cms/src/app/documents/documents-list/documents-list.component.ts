import {Component, OnDestroy, OnInit} from '@angular/core';
import { Document } from '../document.model';
import { DocumentsService } from '../documents.service';
import {Subscription} from "rxjs/Subscription";


@Component({
  selector: 'cms-documents-list',
  templateUrl: './documents-list.component.html',
  styleUrls: ['./documents-list.component.css']
})
export class DocumentsListComponent implements OnInit, OnDestroy {

  documents: Document[] = [];
  subscription: Subscription;

  constructor(private documentsService: DocumentsService) {
    this.documents = documentsService.getDocuments();
  }

  ngOnInit() {
    this.documentsService.documentChangedEvent.subscribe((documents: Document[]) =>
    this.documents = documents);

    this.subscription = this.documentsService.documentListChangedEvent
      .subscribe((documentsList: Document[]) =>
          this.documents = documentsList);

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


}
