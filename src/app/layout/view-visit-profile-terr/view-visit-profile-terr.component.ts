import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { TerritoriosService } from '../../../services/territorios.service';
import { TranslateService } from '@ngx-translate/core';
import { AlertService } from 'ngx-alerts';
import { VisitaTerritorio } from '../../../models/visita-territorio';


import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
declare var $:any;
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
	longitude :any=localStorage.getItem('geolocationPosition')["coords"]["longitude"]
  latitude :any=localStorage.getItem('geolocationPosition')["coords"]["latitude"];
  selectedOb:boolean=false;
  	markers = [{ latitude: localStorage.getItem('geolocationPosition')["coords"]["latitude"],
             longitude: localStorage.getItem('geolocationPosition')["coords"]["longitude"]}];
  preFiles:File[]=[];

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
   // this.getLocalizacion();



  }

/*getLocalizacion(){
     if (window.navigator && window.navigator.geolocation) {
        window.navigator.geolocation.getCurrentPosition(
            position => {
                this.latitude=position["coords"]["latitude"];
                this.longitude=position["coords"]["longitude"];
                console.log(this.latitude);
                console.log(this.longitude);
                this.markers=[{ latitude: position["coords"]["latitude"],
                				longitude: position["coords"]["longitude"]}];

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
  }*/
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

                        		let h=date.getHours();
                        		let min=date.getMinutes();
                        		let s=date.getSeconds();

                        		visita["fecha"]=d +'/' + m + '/' + y;
                        		visita["hora"]=h +':' + min + ':' + s;

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

  registraVisita(){
  		this.loading=true;
  		let visita=new VisitaTerritorio();
  		visita.setObservacionId(this.registerForm.get("observacion").value);
  		visita.setLat(this.markers[0]["latitude"]);
  		visita.setLon(this.markers[0]["longitude"]);
  		visita.setFecha(new Date());
  		visita.setHora(new Date());

  		//TODO: El usuario tiene que sacarse de localstorage
  		visita.setUsuario("0");


  		//TODO: Falta implementar subida de fotos

  		console.log(visita);
  		this.territoriosService.nuevaVisitaTerritorio(visita,this.terrId).subscribe(
                        data =>{
                        	console.log(data);
                        	if(this.preFiles.length > 0)
                          {
                              console.log(this.preFiles);
                              this.territoriosService.uploadImage(data["id"],this.preFiles).subscribe(
                                  (data : any)=>{
                                      this.loading=false;
                                      this.alertService.success(this.translate.instant("ViewVisitProfile.success4"));
                                  },
                                  error=>{
                                    this.loading=false;
                                    this.alertService.danger(this.translate.instant("ViewVisitProfile.error4"));
                                  }
                                );      
                          } else{
                            this.loading=false;
                          }

                        	let date=new Date((data["fecha"]));
                        	let y=date.getFullYear();
                        	let m=date.getMonth()+1;
                        	let d=date.getUTCDate();

                        	let h=date.getHours();
                        	let min=date.getMinutes();
                        	let s=date.getSeconds();
                        	
                        	data["fecha"]=(d +'/' + m + '/' + y);
                        	data["hora"]=h +':' + min + ':' + s;

                        	this.listaVisitas.push(data);

                        	console.log(this.listaVisitas);
                        	this.alertService.success(this.translate.instant("ViewVisitProfile.success1"));
                        },
                        error=>{
                        	this.loading=false;
                            console.log(error);
                            this.alertService.danger(this.translate.instant("ViewVisitProfile.error1"));
                        });


  	}


  	eliminaVisitaModal(contentEliminar){
  		this.modalService.open(contentEliminar, {});
  	}

  	eliminaVisita(visita){

  		this.loading=true;

  		this.territoriosService.eliminarVisita(visita.id).subscribe(
                        data =>{
                        	this.loading=false;
                        	this.listaVisitas.splice(
                        		this.listaVisitas.indexOf(visita),1);

                        	this.alertService.success(this.translate.instant("ViewVisitProfile.success3"));
                        },
                        error=>{                            console.log(error);
                            this.alertService.danger(this.translate.instant("ViewVisitProfile.error3"));
                            this.loading=false;
                        });
  	}


  	editaVisitaModal(observacion,lat, lon, content){
  		this.isEdit=true;

  		//Para rellenar el formulario
  		this.markers=[{ latitude: lat,longitude: lon}];

  		this.registerForm.get('observacion').setValue(observacion);

  		this.modalService.open(content, {});

  	}

  	editaVisita(visita){

  		//Volvemos a recuperar los datos que han podido ser modificados por el usuario
  		this.loading=true;
  		let newVisita=new VisitaTerritorio();
  		newVisita.setObservacionId(this.registerForm.get("observacion").value);
  		newVisita.setLat(this.markers[0]["latitude"]);
  		newVisita.setLon(this.markers[0]["longitude"]);

  		
  		this.territoriosService.modificarVisita(visita.id, newVisita).subscribe(
                        data =>{
                        	this.loading=false;
                        	this.isEdit=false;
                        	let date=new Date((data["fecha"]));
                        	let y=date.getFullYear();
                        	let m=date.getMonth()+1;
                        	let d=date.getUTCDate();

                        	let h=date.getHours();
                        	let min=date.getMinutes();
                        	let s=date.getSeconds();

                        	data["fecha"]=(d +'/' + m + '/' + y);
                        	data["hora"]=h +':' + min + ':' + s;

                        	this.listaVisitas[this.listaVisitas.indexOf(visita)]=data;

                        	this.alertService.success(this.translate.instant("ViewVisitProfile.success2"));
                        },
                        error=>{
                        	this.loading=false;
                        	this.isEdit=false;
                            console.log(error);
                            this.alertService.danger(this.translate.instant("ViewVisitProfile.error2"));
                        });
  	}

    preUpload(event) {
      let file = event.target.files;
      if (file.length > 0) {
        for (let i in file){
          this.preFiles[i]=file[i];
      }
        }
    }



}
