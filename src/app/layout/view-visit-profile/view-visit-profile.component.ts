import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ColoniasService } from '../../../services/colonias.service';
import { TranslateService } from '@ngx-translate/core';
import { AlertService } from 'ngx-alerts';
import { VisitaColonia } from '../../../models/visita-colonia';


import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedServicesService } from '../../../services/shared-services.service';
import { AuthService } from '../../../services/auth.service';




@Component({
  selector: 'app-view-visit-profile',
  templateUrl: './view-visit-profile.component.html',
  styleUrls: ['./view-visit-profile.component.scss']
})
export class ViewVisitProfileComponent implements OnInit {

  preFiles:File[]=[];
	listaVisitas:any=[];
  listaTemporadas:any=[];
	colId:any;
	registerForm: FormGroup;
	totalPages:number=0;
	loading=false;
	usuario=localStorage.getItem("userId");
	isEdit=false;
  filtered=false;
  mostrarDescargar:boolean=false;
  

	constructor(private translate: TranslateService,
                private coloniasService: ColoniasService,
                public alertService: AlertService,
                private route:ActivatedRoute,
                private modalService: NgbModal,
                private formBuilder: FormBuilder,
                private sharedServices: SharedServicesService,
                private authService: AuthService) { 
		 	
}

  	ngOnInit() {
      this.isAdmin();
  		this.route.params.subscribe(
  			params=>{
  				this.colId=params["colId"];
  				this.recuperaVisitas(params["colId"], 1);
  			});

  		this.registerForm = this.formBuilder.group({
            nombre: ['', Validators.required],
            numNidos: ['', Validators.required],
            numNidosExito: ['', Validators.required],
            numNidosOcupados: ['', Validators.required],
            numNidosVacios: ['', Validators.required],
            numVisita: ['', Validators.required],
            temporada: ['', Validators.required]

        });

      this.recuperaTemporadas();
      console.log(this.usuario);
      

  	}

 isAdmin(){
    this.authService.isAdmin().subscribe(
              data => {
                this.mostrarDescargar=data;
              },
              error => {
                  console.log(error);
                  
            }
        );
  }
  
    exportAsXLSX():void {

       let dataToExport:any=[];

       for (let position in this.listaVisitas){

        
           let element={
           "Nombre": this.listaVisitas[position].nombre,
           "Fecha":this.listaVisitas[position].fecha,
           "Numero de nidos":this.listaVisitas[position].numNidos,
           "Numero de nidos éxito": this.listaVisitas[position].numNidosExito,
           "Número de nidos ocupados":this.listaVisitas[position].numNidosOcupados,
           "Numero de nidos vacíos":this.listaVisitas[position].numNidosVacios,
           "Número de la visita":this.listaVisitas[position].numVisita
           }
           dataToExport.push(element);

         
         

       }
       this.sharedServices.exportAsExcelFile(dataToExport, 'sample');

}

    preUpload(event) {
      let file = event.target.files;
      if (file.length > 0) {
        for (let i in file){
          this.preFiles[i]=file[i];
      }
        }
    }


  	recuperaVisitas(colId, pageNumber){
  		this.coloniasService.recuperaVisitasGeneral('?colonia='+colId+'&page='+pageNumber).subscribe(
                        data =>{
                          console.log(data);
                        	this.listaVisitas=[];
                        	for (let visita of data["hydra:member"]){
                           
                            let date=new Date((visita["fecha"]));
                        		let y=date.getFullYear();
                        		let m=date.getMonth()+1;
                        		let d=date.getUTCDate();
                        		visita["fecha"]=d +'/' + m + '/' + y;
                  					
                            if (visita.visitaColoniaImages.length>0){
                              visita["image"]=visita.visitaColoniaImages[0]["fileName"]+visita.visitaColoniaImages[0]["image"];
                            }
                  					
                  					
                        		this.listaVisitas.push(visita);
                        	}
                        /*	let last=data["hydra:view"]["hydra:last"];
			                last=last.substr(last.indexOf('page')+5); //Cogemos el substring a partir de page +5, es decir +4 (numero de letras de page) +1 para no coger el "=", es decir, +5
			                this.totalPages=last*10;*/
                        	
                        },
                        error=>{
                            console.log(error);
                        });
  	}

  	openLg(content) {
    	this.modalService.open(content, {});
  	}

  	registraVisita(){
  		this.loading=true;
  		let visita=new VisitaColonia();
  		visita.setNombreUsuario(this.registerForm.get("nombre").value);
  		visita.setNumNidos(this.registerForm.get("numNidos").value);
  		visita.setNumNidosExito(this.registerForm.get("numNidosExito").value);
  		visita.setNumNidosOcupados(this.registerForm.get("numNidosOcupados").value);
  		visita.setNumNidosVacios(this.registerForm.get("numNidosVacios").value);
  		visita.setNumVisita(parseInt(this.registerForm.get("numVisita").value));
      visita.setAnno(parseInt(this.registerForm.get("temporada").value));
  		visita.setFecha(new Date());
  		console.log(visita);
  		this.coloniasService.nuevaVisitaColonia(visita,this.colId).subscribe(
                        data =>{
                        	
                        	let date=new Date((data["fecha"]));
                        	let y=date.getFullYear();
                        	let m=date.getMonth()+1;
                        	let d=date.getUTCDate();
                        	data["fecha"]=(d +'/' + m + '/' + y);
                        	data["usuario"]=visita.getUsuario();
                        	data["nombreUsuario"]=visita.getNombreUsuario();
                        	

                        	this.alertService.success(this.translate.instant("ViewVisitProfile.success1"));

                          if(this.preFiles.length > 0)
                          {
                              this.coloniasService.uploadImage(data["id"],this.preFiles).subscribe(
                                  (dataImages : any)=>{
                                    console.log(dataImages);
                                      data["image"]=dataImages.visitaColoniaImages[0]["fileName"]+dataImages.visitaColoniaImages[0]["image"];
                                      this.listaVisitas.push(data);
                                      this.loading=false;
                                      this.alertService.success(this.translate.instant("ViewVisitProfile.success4"));
                                  },
                                  error=>{
                                    this.listaVisitas.push(data);
                                    this.loading=false;
                                    this.alertService.danger(this.translate.instant("ViewVisitProfile.error4"));
                                  }
                                );      
                          } else{
                            this.listaVisitas.push(data);
                            this.loading=false;
                          }

                        },
                        error=>{
                        	this.loading=false;
                            console.log(error);
                            this.alertService.danger(this.translate.instant("ViewVisitProfile.error1"));
                        });


  	}

  	 pageChanged(page) {
    	this.recuperaVisitas(this.colId,page);
  	}

  	

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
                          console.log(data);
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
	
	
	
	verFotosModal(content){
  		this.modalService.open(content, {});
  	}

    recuperaTemporadas(){
    this.coloniasService.getTemporadas().subscribe(
      data=>{
        for (let item of data["hydra:member"]){
          if (item["abierta"]==true){
            this.listaTemporadas.push(item["anno"]);
          }
        }
        console.log(this.listaTemporadas);
      },
      error=>{
        console.log(error);
      })
  }

}
