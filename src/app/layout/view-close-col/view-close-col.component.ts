import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-close-col',
  templateUrl: './view-close-col.component.html',
  styleUrls: ['./view-close-col.component.scss']
})
export class ViewCloseColComponent implements OnInit {
	title: string = 'My first AGM project';
  	lat: number = 51.678418;
  	lng: number = 7.809007;

  constructor() { }

  ngOnInit() {
  }
}


