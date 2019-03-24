import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ColoniasService } from '../../../services/colonias.service';
import { AlertService } from 'ngx-alerts';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-view-close-col',
  templateUrl: './view-close-col.component.html',
  styleUrls: ['./view-close-col.component.scss']
})
export class ViewCloseColComponent implements OnInit {
	title: string = 'My first AGM project';
  	lat: number = 51.678418;
  	lng: number = 7.809007;
    geolocationPosition:any;
    listaColonias:any[]= [];
  constructor( private coloniasService: ColoniasService,
               public alertService: AlertService,
               private translate: TranslateService,
               private modalService: NgbModal) {
     

        }

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

  getColoniasCercanas(radio){
    let lat=this.geolocationPosition["coords"]["latitude"];
    let lon=this.geolocationPosition["coords"]["longitude"];
    let especie=9;

    this.coloniasService.recuperaColoniasCercanas(radio,lat,lon,especie).subscribe(
              data => {
                this.listaColonias=data;
                console.log(data);
              },
              error => {
                  this.alertService.warning(this.translate.instant("ViewCol.errorMsg1"));
                  
            }
        );
    
  }


   openLg(content) {
    this.modalService.open(content, { size: 'lg' });
  }
}


