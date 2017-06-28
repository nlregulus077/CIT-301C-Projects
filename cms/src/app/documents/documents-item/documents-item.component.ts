import {Component, Input, OnInit} from '@angular/core';

import {ActivatedRoute, Router} from '@angular/router';

import {Document} from "../document.model";

@Component({
  selector: 'cms-documents-item',
  templateUrl: './documents-item.component.html',
  styleUrls: ['./documents-item.component.css']
})
export class DocumentsItemComponent implements OnInit {

  @Input() document: Document;

  constructor() {

  }

  ngOnInit() {
  }

}
