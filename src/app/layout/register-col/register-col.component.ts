import { Component, OnInit} from '@angular/core';
import { SeoApisService } from '../../../services/seo-apis.service';
import { ColoniasService } from '../../../services/colonias.service';
import { TranslateService } from '@ngx-translate/core';
import { AlertService } from 'ngx-alerts';
import { Colonia } from '../../../models/colonia';
import { LocNidos } from '../../../models/loc-nidos';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
declare var $:any;

@Component({
  selector: 'app-register-col',
  templateUrl: './register-col.component.html',
  styleUrls: ['./register-col.component.scss']
})
export class RegisterColComponent implements OnInit {

  listaCCAA:any[]= [];
  listaProv:any[]= [];
  listaMun:any[]= [];
  listaTipoProp:any[]= [];
  listaTipoEd:any[]= [];
  listaCol:any[]= [];
  listaNidos:any[]= [];
  listaEspecies:any[]= [];
  listaEspeciesNombres:any[]= [];
  otras:boolean =false;
  colonia=new Colonia();
  locNidos= new LocNidos();
  registerForm: FormGroup;

  constructor(private translate: TranslateService,
                private seoService: SeoApisService,
                private coloniasService: ColoniasService,
                public alertService: AlertService,
                private formBuilder: FormBuilder) { }

  ngOnInit() {
  	this.recuperaCCAA();
  	this.recuperaTipoProp();
  	this.recuperaTipoEd();
  	this.recuperaColoniales();
  	this.registerForm = this.formBuilder.group({
            nombre: ['', Validators.required],
            nombreCentro: ['', Validators.required],
            barrio: ['', Validators.required],
            calleNumPiso: ['', Validators.required],
            ccaa: ['', Validators.required],
            provincia: ['', Validators.required],
            municipio: ['', Validators.required],
            tipoPropiedad: ['', Validators.required],
            tipoEdificio: ['', Validators.required],
            temporada: ['', Validators.required]
        });
  }

  recuperaColoniales(){
        this.seoService.listaColoniales().subscribe(
              data => {
                this.listaCol=data;
                console.log(this.listaCol);
              },
              error => {
                  this.alertService.warning(this.translate.instant("Dashboard.errorGetCol"));
                  
            }
        );
    }

  recuperaTipoProp(){
  	this.seoService.getTipoProp().subscribe(
              data => {
                this.listaTipoProp=data["hydra:member"];
              }
        );
  }

  recuperaTipoEd(){
  	this.seoService.getTipoEd().subscribe(
              data => {
                this.listaTipoEd=data["hydra:member"];
              }
        );
  }

  recuperaCCAA(){
  	this.seoService.getCCAA().subscribe(
              data => {
                this.listaCCAA=data;
              },
              error => {
                  this.alertService.warning(this.translate.instant("Dashboard.errorGetCCAA"));
                  
            }
        );
  }

  recuperaProvincia(){
  	this.listaProv= [];
  	this.listaMun= [];
  	let id= $( "#selectCCAA option:selected" ).attr("id");
  	this.seoService.getProvincia(id).subscribe(
              data => {
                this.listaProv=data;
              },
              error => {
                  this.alertService.warning(this.translate.instant("Dashboard.errorGetProv"));
                  
            }
        );

  }

  recuperaMunicipio(){
  	let id= $( "#selectProvincia option:selected" ).attr("id");
  	this.seoService.getMunicipio(id).subscribe(
              data => {
                this.listaMun=data;
              },
              error => {
                  this.alertService.warning(this.translate.instant("Dashboard.errorGetMun"));
                  
            }
        );

  }

  prepararDatos(){
  	
  	//PASO 1 ->Información general de la colonia

	


  	//Esta info debe ser sacada de localstorage
  	this.colonia.setUsuario("pruebaUsu");
  	this.colonia.setEspecie(9);
  	//

  	
  	this.colonia.setNombre(this.registerForm.get("nombre").value);
  	this.colonia.setNombreCentro(this.registerForm.get("nombreCentro").value);
  	this.colonia.setTemporada(parseInt(this.registerForm.get("temporada").value, 10));
  	this.colonia.setCcaa(this.registerForm.get("ccaa").value);
  	this.colonia.setProvincia(this.registerForm.get("provincia").value);
  	this.colonia.setMunicipio(this.registerForm.get("municipio").value);
  	this.colonia.setBarrio(this.registerForm.get("barrio").value);
  	this.colonia.setCalleNumPiso(this.registerForm.get("calleNumPiso").value);
  	this.colonia.setTipoEdificio(this.registerForm.get("tipoEdificio").value);
  	this.colonia.setTipoPropiedad(this.registerForm.get("tipoPropiedad").value);


  	//PASO 2 -> Información sobre los nidos

  	

  	this.locNidos.setFachada($("#fachada").is(":checked"));
  	this.locNidos.setTrasera($("#trasera").is(":checked"));
  	this.locNidos.setLatDer($("#latDer").is(":checked"));
  	this.locNidos.setLatIzq($("#latIzq").is(":checked"));
  	this.locNidos.setPatio($("#patio").is(":checked"));

  	this.listaNidos=[];

  	if($("#fachada").is(":checked")){
  		this.listaNidos.push(this.translate.instant("RegisterCol.fachada"));
  	}
  	if($("#trasera").is(":checked")){
  		this.listaNidos.push(this.translate.instant("RegisterCol.trasera"));
  	}
  	if($("#latDer").is(":checked")){
  		this.listaNidos.push(this.translate.instant("RegisterCol.latDer"));
  	}
  	if($("#latIzq").is(":checked")){
  		this.listaNidos.push(this.translate.instant("RegisterCol.latIzq"));
  	}
  	if($("#patio").is(":checked")){
  		this.listaNidos.push(this.translate.instant("RegisterCol.patio"));
  	}

  	//PASO 3 -> Información sobre otras especies

  	this.listaEspecies=[];
  	this.listaEspeciesNombres=[];


  		for (let item of this.listaCol){
  			if($("#"+item.ID_ESP).is(":checked")){
  				this.listaEspecies.push(item.ID_ESP);
  				this.listaEspeciesNombres.push(item.DEN_ESP_CAS);

  			}
  		}
  	
	console.log(this.listaEspecies);
  	console.log(this.listaEspeciesNombres);



  }

  registrarColonia(){

  		//Empezamos registrando la colonia
  	  	this.coloniasService.nuevaColonia(this.colonia).subscribe(
              data => {
              	//Cuando la colonia es creada, obtenemos su id para completar los siguientes pasos
                console.log(data);

                //Completamos datos de nidos
                this.coloniasService.completaColoniaNidos(this.locNidos,data["id"]).subscribe(
                	dataNidos =>{
                			console.log(dataNidos);
                	},
                	errorNidos=>{
                			console.log(errorNidos);
                	});


               	//Completamos datos de especies en caso necesario
               	if(this.listaEspecies.length>0){
               		this.coloniasService.completaColoniaEspecies(this.listaEspecies,data["id"]).subscribe(
                	dataEspecies =>{
                			console.log(dataEspecies);
                	},
                	errorEspecies=>{
                			console.log(errorEspecies);
                	});
               	}
                

              },
              error => {
                 console.log(error);
                  
            }
        );
  }



}
