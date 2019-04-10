import { Component, OnInit} from '@angular/core';
import { SeoApisService } from '../../../services/seo-apis.service';
import { TerritoriosService } from '../../../services/territorios.service';
import { TranslateService } from '@ngx-translate/core';
import { AlertService } from 'ngx-alerts';
import { Territorio } from '../../../models/territorio';
import { LocNidosTerr } from '../../../models/loc-nidos-terr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
declare var $:any;

@Component({
  selector: 'app-register-terr',
  templateUrl: './register-terr.component.html',
  styleUrls: ['./register-terr.component.scss']
})
export class RegisterTerrComponent implements OnInit {

  	registerForm: FormGroup;

  	listaEmpl:any=[];
  	listaTipos:any=[];
  	listaCCAA:any[]= [];
	listaTemporadas:any[]= [];
	listaProv:any[]= [];
	listaMun:any[]= [];
	listaTipoProp:any[]= [];
	listaTipoEd:any[]= [];
	listaNidos:any[]= [];
	loading=false;
	longitude :any;
	latitude :any;

	  markers = [
	  ];
  	constructor(private translate: TranslateService,
                private seoService: SeoApisService,
                private territoriosService: TerritoriosService,
                public alertService: AlertService,
                private formBuilder: FormBuilder) { }

  	ngOnInit() {
  		this.getLocalizacion();
  		this.recuperaTemporadas();
	  	this.recuperaCCAA();
	  	this.recuperaTipoProp();
	  	this.recuperaTipoEd();
	  	this.recuperaEmplazamientos();
	  	this.recuperaTipos();

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
            temporada: ['', Validators.required],
            numPiso: [''],
            emplazamiento: ['', Validators.required],
            tipo:[''],
            amenazada: ['', Validators.required]
        });

  	}


  	recuperaTemporadas(){
    this.territoriosService.getTemporadas().subscribe(
      data=>{
        
        for (let item of data){
          if (item["abierta"]==true){
            this.listaTemporadas.push(item["anno"]);
          }
        }
      },
      error=>{
        console.log(error);
      })
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
  

  recuperaEmplazamientos(){
  	this.territoriosService.getEmplazamientos().subscribe(
              data => {
                this.listaEmpl=data["hydra:member"];
              }
        );
  	
  }

  recuperaTipos(){
  	this.territoriosService.getTipos().subscribe(
              data => {
              	console.log(data);
                this.listaTipos=data["hydra:member"];
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

getLocalizacion(){
     if (window.navigator && window.navigator.geolocation) {
        window.navigator.geolocation.getCurrentPosition(
            position => {
                this.latitude=position["coords"]["latitude"];
                this.longitude=position["coords"]["longitude"];
                console.log(this.latitude);
                console.log(this.longitude);
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

  registraTerritorio(){

  	//PASO 1 ->Información general del territorio

  	let territorio= new Territorio();
  	let locNidos= new LocNidosTerr();

  	//Esta info debe ser sacada de localstorage
  	territorio.setUsuario("pruebaUsu");
    locNidos.setUsuario("pruebaUsu");
  	territorio.setEspecie(parseInt(JSON.parse(localStorage.getItem('especie'))["especie_id"]));
  	//

  	
  	territorio.setNombre(this.registerForm.get("nombre").value);
  	territorio.setNombreCentro(this.registerForm.get("nombreCentro").value);
  	territorio.setAnno(parseInt(this.registerForm.get("temporada").value, 10));
  	territorio.setCcaa(this.registerForm.get("ccaa").value);
  	territorio.setProvincia(this.registerForm.get("provincia").value);
  	territorio.setMunicipio(this.registerForm.get("municipio").value);
  	territorio.setBarrio(this.registerForm.get("barrio").value);
  	territorio.setCalleNumPiso(this.registerForm.get("calleNumPiso").value);
  	territorio.setTipoEdificio(this.registerForm.get("tipoEdificio").value);
  	territorio.setTipoPropiedad(this.registerForm.get("tipoPropiedad").value);
  	territorio.setTipoTerritorioId(this.registerForm.get("tipo").value);
  	territorio.setAmenazada(JSON.parse(this.registerForm.get("amenazada").value));


  	//PASO 2 -> Información sobre los nidos

  	

  	locNidos.setFachada($("#fachada").is(":checked"));
  	locNidos.setTrasera($("#trasera").is(":checked"));
  	locNidos.setLatDer($("#latDer").is(":checked"));
  	locNidos.setLatIzq($("#latIzq").is(":checked"));
  	locNidos.setPatio($("#patio").is(":checked"));
    locNidos.setLat(this.markers["0"]["latitude"]);
    locNidos.setLon(this.markers["0"]["longitude"]);
    locNidos.setNumPiso(this.registerForm.get("numPiso").value);
  	locNidos.setEmplazamientoId(this.registerForm.get("emplazamiento").value);


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


  	console.log(territorio);
  	console.log(locNidos);


  	 this.loading=true;
  		//Empezamos registrando el territorio
  	  	this.territoriosService.nuevoTerritorio(territorio).subscribe(
              data => {
              	//Cuando el territorio es creado, obtenemos su id para completar los siguientes pasos
                this.alertService.success(this.translate.instant("RegisterTerr.successMsg1"));

                //Completamos datos de nidos
                this.territoriosService.completaTerritorioNidos(locNidos,data["id"]).subscribe(
                	dataNidos =>{
                    this.alertService.success(this.translate.instant("RegisterCol.successMsg2"));
                		this.loading=false;
                	},
                	errorNidos=>{
                			this.alertService.danger(this.translate.instant("RegisterCol.errorMsg2"));
                      this.loading=false;
                	});

                

              },
              error => {
                 this.alertService.danger(this.translate.instant("RegisterTerr.errorMsg1"));
                 this.loading=false;
                  
            }
        );
  }

}
