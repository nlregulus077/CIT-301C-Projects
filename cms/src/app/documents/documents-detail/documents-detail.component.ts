import {Component, OnInit} from '@angular/core';
import {Document} from '../document.model';
import {DocumentsService} from '../documents.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {WindRefService} from '../../wind-ref.service';

@Component({
  selector: 'cms-documents-detail',
  templateUrl: './documents-detail.component.html',
  styleUrls: ['./documents-detail.component.css']
})
export class DocumentsDetailComponent implements OnInit {

  document: Document;
  id: string;
  nativeWindow: any;

  constructor(private documentService: DocumentsService,
              private windowRefService: WindRefService,
              private router: Router,
              private route: ActivatedRoute) {
    this.nativeWindow = windowRefService.getNativeWindow();
  }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.document = this.documentService.getDocument(this.id);
      }
    );
  }

  onView(){
    if (this.document.url) {
      this.nativeWindow.open(this.document.url);
    }
  }

  onDelete() {
    this.documentService.deleteDocument(this.document);
    this.router.navigate(['/documents']);
  }

}
