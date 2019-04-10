import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { TerritoriosService } from '../../../services/territorios.service';
import { TranslateService } from '@ngx-translate/core';
import { AlertService } from 'ngx-alerts';
import { VisitaTerritorio } from '../../../models/visita-territorio';


import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-view-visit-profile-terr',
  templateUrl: './view-visit-profile-terr.component.html',
  styleUrls: ['./view-visit-profile-terr.component.scss']
})
export class ViewVisitProfileTerrComponent implements OnInit {

	listaVisitas:any=[];
	listaObservaciones:any=[];
	terrId:any;
	registerForm: FormGroup;
	totalPages:number=0;
	loading=false;
	usuario=0;
	isEdit=false;
	longitude :any;
  	latitude :any;

  	markers = [
  	];

  constructor(private translate: TranslateService,
                private territoriosService: TerritoriosService,
                public alertService: AlertService,
                private route:ActivatedRoute,
                private modalService: NgbModal,
                private formBuilder: FormBuilder) { }

  ngOnInit() {

  	this.route.params.subscribe(
  			params=>{
  				this.terrId=params["terrId"];
  				this.recuperaVisitas(params["terrId"], 1);
  			});

  		this.registerForm = this.formBuilder.group({
            observacion: ['', Validators.required]

        });

        //TODO: recuperar usuario de localstorage

    this.recuperaObservaciones();
    this.getLocalizacion();



  }

getLocalizacion(){
     if (window.navigator && window.navigator.geolocation) {
        window.navigator.geolocation.getCurrentPosition(
            position => {
                this.latitude=position["coords"]["latitude"];
                this.longitude=position["coords"]["longitude"];
                console.log(this.latitude);
                console.log(this.longitude);
                this.markers=[{ latitude: position["coords"]["latitude"],
                				longitude: position["coords"]["longitude"]];

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
//https://mdbootstrap.com/docs/angular/advanced/google-maps/
placeMarker(position: any) {
const lat = position.coords.lat;
const lng = position.coords.lng;

this.markers=[{ latitude: lat, longitude: lng }];
}

  recuperaVisitas(terrId, pageNumber){
  		this.territoriosService.recuperaVisitasGeneral('?territorio='+terrId+'&page='+pageNumber).subscribe(
                        data =>{

                        	console.log(data);


                        	this.listaVisitas=[];
                        	for (let visita of data["hydra:member"]){
                        		let date=new Date((visita["fecha"]));
                        		let y=date.getFullYear();
                        		let m=date.getMonth()+1;
                        		let d=date.getUTCDate();
                        		visita["fecha"]=d +'/' + m + '/' + y;
                        		this.listaVisitas.push(visita);
                        	}
                        	let last=data["hydra:view"]["hydra:last"];
			                last=last.substr(last.indexOf('page')+5); //Cogemos el substring a partir de page +5, es decir +4 (numero de letras de page) +1 para no coger el "=", es decir, +5
			                this.totalPages=last*10;
                        	console.log(data);
                        },
                        error=>{
                            console.log(error);
                        });
  	}

  	openLg(content) {
    	this.modalService.open(content, {});
  	}

  	 pageChanged(page) {
    	this.recuperaVisitas(this.terrId,page);
  	}

  	recuperaObservaciones(){
  	this.territoriosService.getObservaciones().subscribe(
              data => {
                this.listaObservaciones=data["hydra:member"];
                console.log(this.listaObservaciones);
              }
        );
  }

}
