import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TerritoriosService } from '../../../services/territorios.service';
import { AlertService } from 'ngx-alerts';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-view-close-terr',
  templateUrl: './view-close-terr.component.html',
  styleUrls: ['./view-close-terr.component.scss']
})
export class ViewCloseTerrComponent implements OnInit {
title: string = 'My first AGM project';
  	lat: number = 51.678418;
  	lng: number = 7.809007;
    geolocationPosition:any;
    numTerritorios:any;


  constructor(private territoriosService: TerritoriosService,
               public alertService: AlertService,
               private translate: TranslateService,
               private modalService: NgbModal) { }

  ngOnInit() {
  	this.getLocalizacion();
  }


  getLocalizacion(){
     if (window.navigator && window.navigator.geolocation) {
        window.navigator.geolocation.getCurrentPosition(
            position => {
                this.geolocationPosition = position,
                    console.log(position)
            },
            error => {
                switch (error.code) {
                    case 1:
                        console.log('Permission Denied');
                        break;
                    case 2:
                        console.log('Position Unavailable');
                        break;
                    case 3:
                        console.log('Timeout');
                        break;
                }
            }
        );
    };
  }


  getTerritoriosCercanos(radio){
    let lat=this.geolocationPosition["coords"]["latitude"];
    let lon=this.geolocationPosition["coords"]["longitude"];
    let especie=parseInt(JSON.parse(localStorage.getItem('especie'))["especie_id"]);


    this.territoriosService.recuperaTerritoriosCercanos(radio,lat,lon,especie).subscribe(
              data => {
                this.numTerritorios=data;
                console.log(data);
              },
              error => {
                  this.alertService.warning(this.translate.instant("ViewCol.errorMsg1"));
                  
            }
        );
    
  }

 



}
