import {EventEmitter, Injectable} from '@angular/core';
import { Document } from './document.model';
import {Subject} from "rxjs/Subject";
import {Http, Response} from '@angular/http';
import "rxjs/Rx";

@Injectable()
export class DocumentsService {

  documentSelectedEvent = new EventEmitter<Document>();
  documentChangedEvent = new EventEmitter<Document[]>();
  documentListChangedEvent = new Subject<Document[]>();

  documents: Document[] = [];
  public maxDocumentId: number = 0;

  constructor(private http: Http) {
    this.initDocuments();
  }

  getDocuments(): Document[] {
    return this.documents.slice();
  }

  getDocument(id: string): Document {
    for (let document of this.documents) {
      if (document.id === id)
        return document;
    }
    return null;
  }

  getMaxId(): number {
    let maxId = 0;
    for (let document of this.documents) {
      let currentId = parseInt(document.id);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  addDocument(newDocument: Document) {
    if (newDocument === null) {
      return;
    }

    this.maxDocumentId++;
    newDocument.id = this.maxDocumentId.toString();
    this.documents.push(newDocument);
    let documentsListClone = this.documents.slice();
    this.storeDocuments();

  }

  updateDocument(originalDocument: Document,
                 newDocument: Document) {
    if (originalDocument === null) {
      return;
    }
    else if (newDocument === null) {
      return;
    }

    const pos = this.documents.indexOf(originalDocument);
    if (pos < 0) {
      return;
    }

    newDocument.id = originalDocument.id;
    this.documents[pos] = newDocument;
    this.storeDocuments()
  }


  deleteDocument(document: Document) {
    if (document === null) {
      return;
    }

    const pos = this.documents.indexOf(document);
    if (pos < 0) {
      return;
    }

    this.documents.splice(pos, 1);
    this.storeDocuments();
  }

  initDocuments() {
    this.http.get('https://cms-project-777d2.firebaseio.com/documents.json')
      .map(
      (response: Response) => {
        const documents: Document[] = response.json();
        return documents;
      }
    )
      .subscribe(
        (documentsReturned: Document[]) => {
          this.documents = documentsReturned;
          this.maxDocumentId = this.getMaxId();
          this.documentListChangedEvent.next(this.documents.slice());
        }
      );
  }

  storeDocuments() {
    JSON.stringify(this.documents);
    this.http.put('https://cms-project-777d2.firebaseio.com/documents.json', this.getDocuments())
      .subscribe(
        (response: Response) => {
          this.documentListChangedEvent.next(this.documents.slice());
        }
      );
  }

}
