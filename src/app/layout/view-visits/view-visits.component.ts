import { Component, OnInit } from '@angular/core';
import { ColoniasService } from '../../../services/colonias.service';
import { TerritoriosService } from '../../../services/territorios.service';

import { TranslateService } from '@ngx-translate/core';
import { AlertService } from 'ngx-alerts';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VisitaColonia } from '../../../models/visita-colonia';
import { VisitaTerritorio } from '../../../models/visita-territorio';




declare var $:any;
@Component({
  selector: 'app-view-visits',
  templateUrl: './view-visits.component.html',
  styleUrls: ['./view-visits.component.scss']
})
export class ViewVisitsComponent implements OnInit {

	listaVisitas:any=[];
  listaVisitasTerr:any=[];
  listaObservaciones:any=[];


	colonias:any=[];
	coloniasId:any=[];
  territorios:any=[];
  territoriosId:any=[];

  showCol:boolean=true;

  dateSince:any;
  dateUntil:any;

  totalPages:any=0;
  totalPagesTerr:any=0;

registerForm: FormGroup;
registerFormTerr: FormGroup;


loading=false;
isEdit=false;

longitude :any;
latitude :any;
markers = [
    ];

  	constructor(private translate: TranslateService,
                private coloniasService: ColoniasService,
                private territoriosService: TerritoriosService,
                public alertService: AlertService,
                private modalService: NgbModal,
                private formBuilder: FormBuilder) { }

  	ngOnInit() {
  		this.recuperaVisitas(0);
       this.recuperaVisitasTerritorio(0);
       this.registerForm = this.formBuilder.group({
            nombre: ['', Validators.required],
            numNidos: ['', Validators.required],
            numNidosExito: ['', Validators.required],
            numNidosOcupados: ['', Validators.required],
            numNidosVacios: ['', Validators.required],
            numVisita: ['', Validators.required]

        });

       this.registerFormTerr = this.formBuilder.group({
            observacion: ['', Validators.required]

        });

       this.recuperaObservaciones();
      this.getLocalizacion();
  	}

    recuperaObservaciones(){
    this.territoriosService.getObservaciones().subscribe(
              data => {
                this.listaObservaciones=data["hydra:member"];
                console.log(this.listaObservaciones);
              }
        );
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
  }
//https://mdbootstrap.com/docs/angular/advanced/google-maps/
placeMarker(position: any) {
const lat = position.coords.lat;
const lng = position.coords.lng;

this.markers=[{ latitude: lat, longitude: lng }];
}

  	recuperaVisitas(user){
      this.listaVisitas=[];
  		this.coloniasService.recuperaVisitasGeneral('?usuario=' + user ).subscribe(
                        data =>{
                        	

                          let last=data["hydra:view"]["hydra:last"];
                          if (last!=undefined){
                            last=last.substr(last.indexOf('page')+5); //Cogemos el substring a partir de page +5, es decir +4 (numero de letras de page) +1 para no coger el "=", es decir, +5
                          this.totalPages=last*10;
                          }

                            for (let item of data["hydra:member"]){
                              let date=new Date((item["fecha"]));
                              let y=date.getFullYear();
                              let m=date.getMonth()+1;
                              let d=date.getUTCDate()+1;

                              item["fecha"]=d +'/' + m + '/' + y;
                              this.listaVisitas.push(item);

                            	if (this.coloniasId.indexOf(item.colonia["id"])<0){
                            		this.colonias.push(item.colonia);
                            		this.coloniasId.push(item.colonia["id"]);

                            	}
                            }
                            //Tenemos que utilizar los Id's por separado porque indexOf(colonia) no lo detecta como el mismo objeto y no funciona

                        },
                        error=>{
                            console.log(error);
                        });
  	}

    recuperaVisitasTerritorio(user){
      this.listaVisitasTerr=[];
      this.territoriosService.recuperaVisitasGeneral('?usuario='+user).subscribe(
                        data =>{

                          let last=data["hydra:view"]["hydra:last"];
                          if (last!=undefined){
                            last=last.substr(last.indexOf('page')+5); //Cogemos el substring a partir de page +5, es decir +4 (numero de letras de page) +1 para no coger el "=", es decir, +5
                          this.totalPagesTerr=last*10;
                          }

                          for (let visita of data["hydra:member"]){
                            let date=new Date((visita["fecha"]));
                            let y=date.getFullYear();
                            let m=date.getMonth()+1;
                            let d=date.getUTCDate()+1;

                            let h=date.getHours();
                            let min=date.getMinutes();
                            let s=date.getSeconds();

                            visita["fecha"]=d +'/' + m + '/' + y;
                            visita["hora"]=h +':' + min + ':' + s;

                            this.listaVisitasTerr.push(visita);

                            if (this.territoriosId.indexOf(visita.territorio["id"])<0){
                                this.territorios.push(visita.territorio);
                                this.territoriosId.push(visita.territorio["id"]);

                              }


                          }
                        },
                        error=>{
                            console.log(error);
                        });

      console.log(this.listaVisitasTerr);
    }

  	filtrar(user=0, page){
      let id= $( "#colonia option:selected" ).attr("id");
     
      let busqueda='?usuario='+user;

      if (id!="all"){
        busqueda=busqueda+'&colonia='+id;
        
      }
       this.dateSince!=undefined ? busqueda=busqueda+'&fecha[after]='+this.dateSince.year+'-'+this.dateSince.month+'-'+this.dateSince.day : busqueda;
       this.dateUntil!=undefined ? busqueda=busqueda+'&fecha[before]='+this.dateUntil.year+'-'+this.dateUntil.month+'-'+this.dateUntil.day : busqueda;

       page ? busqueda=busqueda+'&page='+page : busqueda;

      this.listaVisitas=[];
      this.coloniasService.recuperaVisitasGeneral(busqueda).subscribe(
                        data =>{
                         

                          let last=data["hydra:view"]["hydra:last"];
                          if (last!=undefined){
                            last=last.substr(last.indexOf('page')+5); //Cogemos el substring a partir de page +5, es decir +4 (numero de letras de page) +1 para no coger el "=", es decir, +5
                          this.totalPages=last*10;
                          }

                          for (let visita of data["hydra:member"]){
                            let date=new Date((visita["fecha"]));
                            let y=date.getFullYear();
                            let m=date.getMonth()+1;
                            let d=date.getUTCDate()+1;

                            visita["fecha"]=d +'/' + m + '/' + y;

                            this.listaVisitas.push(visita);

                          }



                        },
                        error=>{
                            console.log(error);
                        });
  		
  	}




    filtrarTerr(user=0, page){
      let id= $( "#territorio option:selected" ).attr("id");
     
      let busqueda='?usuario='+user;

      if (id!="all"){
        busqueda=busqueda+'&territorio='+id;
        
      }
       this.dateSince!=undefined ? busqueda=busqueda+'&fecha[after]='+this.dateSince.year+'-'+this.dateSince.month+'-'+this.dateSince.day : busqueda;
       this.dateUntil!=undefined ? busqueda=busqueda+'&fecha[before]='+this.dateUntil.year+'-'+this.dateUntil.month+'-'+this.dateUntil.day : busqueda;

      page ? busqueda=busqueda+'&page='+page : busqueda;

      this.listaVisitasTerr=[];

      this.territoriosService.recuperaVisitasGeneral(busqueda).subscribe(
                        data =>{
                         

                          let last=data["hydra:view"]["hydra:last"];
                          if (last!=undefined){
                            last=last.substr(last.indexOf('page')+5); //Cogemos el substring a partir de page +5, es decir +4 (numero de letras de page) +1 para no coger el "=", es decir, +5
                          this.totalPagesTerr=last*10;
                          }
                          

                          for (let visita of data["hydra:member"]){
                            let date=new Date((visita["fecha"]));
                            let y=date.getFullYear();
                            let m=date.getMonth()+1;
                            let d=date.getUTCDate()+1;

                            let h=date.getHours();
                            let min=date.getMinutes();
                            let s=date.getSeconds();

                            visita["fecha"]=d +'/' + m + '/' + y;
                            visita["hora"]=h +':' + min + ':' + s;


                            this.listaVisitasTerr.push(visita);

                          }



                        },
                        error=>{
                            console.log(error);
                        });
      
    }


  	openLg(content) {
    this.modalService.open(content, { size: 'lg' });
  }

  limpiar(){
    this.dateSince=undefined;
    this.dateUntil=undefined;
  }

  pageChanged(page) {
    this.filtrar(0,page);
  }

  pageChangedTerr(page) {
    this.filtrarTerr(0,page);
  }
  	

       //-------------------PARTE DE EDITAR Y ELIMINAR DE   COLONIAS---------------------------
          
	editaVisitaModal(visita, content){
      this.isEdit=true;

      //Para rellenar el formulario
      this.registerForm.get('nombre').setValue(visita.nombreUsuario);
      this.registerForm.get('numNidos').setValue(visita.numNidos);
      this.registerForm.get('numNidosExito').setValue(visita.numNidosExito);
      this.registerForm.get('numNidosOcupados').setValue(visita.numNidosOcupados);
      this.registerForm.get('numNidosVacios').setValue(visita.numNidosVacios);
      this.registerForm.get('numVisita').setValue(visita.numVisita);

      this.modalService.open(content, {});

    }

    editaVisita(visita){

      //Volvemos a recuperar los datos que han podido ser modificados por el usuario
      this.loading=true;
      let newVisita=new VisitaColonia();
      newVisita.setNombreUsuario(this.registerForm.get("nombre").value);
      newVisita.setNumNidos(parseInt(this.registerForm.get("numNidos").value));
      newVisita.setNumNidosExito(parseInt(this.registerForm.get("numNidosExito").value));
      newVisita.setNumNidosOcupados(parseInt(this.registerForm.get("numNidosOcupados").value));
      newVisita.setNumNidosVacios(parseInt(this.registerForm.get("numNidosVacios").value));
      newVisita.setNumVisita(parseInt(this.registerForm.get("numVisita").value));
      
      
      this.coloniasService.modificarVisita(visita.id, newVisita).subscribe(
                        data =>{
                          this.loading=false;
                          this.isEdit=false;
                          let date=new Date((data["fecha"]));
                          let y=date.getFullYear();
                          let m=date.getMonth()+1;
                          let d=date.getUTCDate();
                          data["fecha"]=(d +'/' + m + '/' + y);

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

    eliminaVisitaModal(contentEliminar){
      this.modalService.open(contentEliminar, {});
    }

    eliminaVisita(visita){

      this.loading=true;

      this.coloniasService.eliminarVisita(visita.id).subscribe(
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



    //-------------------PARTE DE EDITAR Y ELIMINAR DE TERRITORIOS---------------------------


    eliminaVisitaModalTerr(contentEliminar){
      this.modalService.open(contentEliminar, {});
    }

    eliminaVisitaTerr(visita){

      this.loading=true;

      this.territoriosService.eliminarVisita(visita.id).subscribe(
                        data =>{
                          this.loading=false;
                          this.listaVisitasTerr.splice(
                            this.listaVisitasTerr.indexOf(visita),1);

                          this.alertService.success(this.translate.instant("ViewVisitProfile.success3"));
                        },
                        error=>{                            console.log(error);
                            this.alertService.danger(this.translate.instant("ViewVisitProfile.error3"));
                            this.loading=false;
                        });
    }


    editaVisitaModalTerr(observacion,lat, lon, content){
      this.isEdit=true;

      //Para rellenar el formulario
      this.markers=[{ latitude: lat,longitude: lon}];

      this.registerFormTerr.get('observacion').setValue(observacion);

      this.modalService.open(content, {});

    }

    editaVisitaTerr(visita){

      //Volvemos a recuperar los datos que han podido ser modificados por el usuario
      this.loading=true;
      let newVisita=new VisitaTerritorio();
      newVisita.setObservacionId(this.registerFormTerr.get("observacion").value);
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

                          this.listaVisitasTerr[this.listaVisitasTerr.indexOf(visita)]=data;

                          this.alertService.success(this.translate.instant("ViewVisitProfile.success2"));
                        },
                        error=>{
                          this.loading=false;
                          this.isEdit=false;
                            console.log(error);
                            this.alertService.danger(this.translate.instant("ViewVisitProfile.error2"));
                        });
    }

}
