import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
declare function refreshSelectpicker(): void;
@Component({
  selector: 'app-document-type-form',
  templateUrl: './document-type-form.component.html',
  styleUrls: ['./document-type-form.component.css']
})
export class DocumentTypeFormComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    refreshSelectpicker();
  }

}
