import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register-visit',
  templateUrl: './register-visit.component.html',
  styleUrls: ['./register-visit.component.scss']
})
export class RegisterVisitComponent implements OnInit {
	title: string = 'My first AGM project';
  	lat: number = 51.678418;
  	lng: number = 7.809007;

  constructor() { }

  ngOnInit() {
  }

}
