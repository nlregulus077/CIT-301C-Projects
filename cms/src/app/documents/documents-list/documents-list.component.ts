import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'cms-documents-list',
  templateUrl: './documents-list.component.html',
  styleUrls: ['./documents-list.component.css']
})
export class DocumentsListComponent implements OnInit {

  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  documents: Document[] =
    [
      new Document(1, 'Materia', 'A detailed list of all known materia found in the Planet', null, null),
      new Document(2, 'GF', 'A comprehensive list of all known Guardian Forces found in the Balamb region', null, null),
      new Document(3, 'Eidolons', 'Ancient eidolon summoning chants used by ancient summoners', null, null),
      new Document(4, 'Aeons', 'A brief history of the Fayth and Aeons', null, null),
      new Document(5, 'Ragnarok', 'A detailed account of when Ragnarok penetrated Cocoon\'s outer shell', null, null),
    ];

  constructor() { }

  ngOnInit() {
  }

  onSelectedDocument(document: Document){
    this.selectedDocumentEvent.emit(document);
  }

}
