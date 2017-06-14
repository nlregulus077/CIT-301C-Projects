import {Component, OnInit} from '@angular/core';
import { Document } from '../document.model';
import { DocumentsService } from '../documents.service';

@Component({
  selector: 'cms-documents-list',
  templateUrl: './documents-list.component.html',
  styleUrls: ['./documents-list.component.css']
})
export class DocumentsListComponent implements OnInit {

  documents: Document[] = [];

  constructor(private documentsService: DocumentsService) {
    this.documents = documentsService.getDocuments();
  }

  ngOnInit() {

  }

  onSelectedDocument(document: Document){
    this.documentsService.documentSelectedEvent.emit(document);
  }

}
