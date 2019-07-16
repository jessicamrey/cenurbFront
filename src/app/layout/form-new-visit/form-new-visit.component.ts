import { Component, OnInit } from '@angular/core';
import {environment} from "../environments/environment";

@Component({
  selector: 'app-form-new-visit',
  templateUrl: './form-new-visit.component.html',
  styleUrls: ['./form-new-visit.component.scss']
})
export class FormNewVisitComponent implements OnInit {
  url:any;
  constructor() { }

  ngOnInit() {
    this.url = environment.backendUrl + '/admin';
  }

}
