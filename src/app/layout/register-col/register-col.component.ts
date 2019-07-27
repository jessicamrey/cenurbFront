import { Component, OnInit} from '@angular/core';
import { SeoApisService } from '../../../services/seo-apis.service';
import { ColoniasService } from '../../../services/colonias.service';
import { TranslateService } from '@ngx-translate/core';
import { AlertService } from 'ngx-alerts';
import { Colonia } from '../../../models/colonia';
import { LocNidos } from '../../../models/loc-nidos';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
declare var $:any;

@Component({
  selector: 'app-register-col',
  templateUrl: './register-col.component.html',
  styleUrls: ['./register-col.component.scss']
})
export class RegisterColComponent implements OnInit {

  isEdit:boolean=false;
  codColonia:any;
	
  listaCCAA:any[]= [];
  listaTemporadas:any[]= [];
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
colId:any;
  locNidos= new LocNidos();
  registerForm: FormGroup;
  loading=false;
  longitude :any=localStorage.getItem('longitude');
  latitude :any=localStorage.getItem('latitude');
type:any=0;
	
	/*
	*type= 0 ->nueva colonia
	*1->nueva temporada
	*2->editar existente
	*/
	
	
  markers = [{ latitude: localStorage.getItem('latitude'),
             longitude: localStorage.getItem('longitude')}];

  constructor(private translate: TranslateService,
                private seoService: SeoApisService,
                private coloniasService: ColoniasService,
                public alertService: AlertService,
                private formBuilder: FormBuilder,
                private route:ActivatedRoute) { }

  ngOnInit() {
    //this.getLocalizacion();
	  this.route.params.subscribe(
  			params=>{
  				this.colId=params["colId"];
				this.type=params["type"];
  				if(params["colId"]!=0){
				   this.recuperaDatosColonia(params["colId"]);
				}
  			});
    this.recuperaTemporadas();
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
	
editarColonia(){
}
	
	recuperaDatosColonia(colId){
		 this.coloniasService.recuperaColonia(colId).subscribe(
			      data=>{
				console.log(data);
			      },
			      error=>{
				console.log(error);
			      })
	
	}

 /* getLocalizacion(){
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
  }*/
//https://mdbootstrap.com/docs/angular/advanced/google-maps/
placeMarker(position: any) {
const lat = position.coords.lat;
const lng = position.coords.lng;

this.markers=[{ latitude: lat, longitude: lng }];
}

  recuperaTemporadas(){
    this.coloniasService.getTemporadas().subscribe(
      data=>{
        
        for (let item of data){
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



  recuperaColoniales(){
        this.seoService.listaColoniales().subscribe(
              data => {
                this.listaCol=data;
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
    this.locNidos.setUsuario("pruebaUsu");
  	this.colonia.setEspecie(parseInt(JSON.parse(localStorage.getItem('especie'))["especie_id"]));
  	//

  	
  	this.colonia.setNombre(this.registerForm.get("nombre").value);
  	this.colonia.setNombreCentro(this.registerForm.get("nombreCentro").value);
  	this.colonia.setAnno(parseInt(this.registerForm.get("temporada").value, 10));
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
    this.locNidos.setLat(this.markers["0"]["latitude"]);
    this.locNidos.setLon(this.markers["0"]["longitude"]);


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
          if(this.translate.currentLang=='es'){
  				  this.listaEspeciesNombres.push(item.DEN_ESP_CAS);
          }
          if(this.translate.currentLang=='eus'){
            this.listaEspeciesNombres.push(item.DEN_ESP_VAS);
          }
          if(this.translate.currentLang=='gal'){
            this.listaEspeciesNombres.push(item.DEN_ESP_GAL);
          }
          if(this.translate.currentLang=='cat'){
            this.listaEspeciesNombres.push(item.DEN_ESP_CAT);
          }
          if(this.translate.currentLang=='en'){
            this.listaEspeciesNombres.push(item.DEN_ESP_EN);
          }
  			}
  		}


	console.log(this.listaEspecies);
  	console.log(this.listaEspeciesNombres);



  }

  registrarColonia(){
    this.loading=true;
  		//Empezamos registrando la colonia
  	  	this.coloniasService.nuevaColonia(this.colonia).subscribe(
              data => {
              	//Cuando la colonia es creada, obtenemos su id para completar los siguientes pasos
                this.alertService.success(this.translate.instant("RegisterCol.successMsg1"));

                //Completamos datos de nidos
                this.coloniasService.completaColoniaNidos(this.locNidos,data["id"]).subscribe(
                	dataNidos =>{
                    this.alertService.success(this.translate.instant("RegisterCol.successMsg2"));
                		this.loading=false;
                	},
                	errorNidos=>{
                			this.alertService.danger(this.translate.instant("RegisterCol.errorMsg2"));
                      this.loading=false;
                	});


               	//Completamos datos de especies en caso necesario
               	if(this.listaEspecies.length>0){
                   for (let id_especie of this.listaEspecies){
                     let params={
                       especie: parseInt(id_especie,10)
                     };
                     this.coloniasService.completaColoniaEspecies(params,data["id"]).subscribe(
                        dataEspecies =>{
                            this.alertService.success(this.translate.instant("RegisterCol.successMsg3"));
                    this.loading=false;
                        },
                        errorEspecies=>{
                            this.alertService.danger(this.translate.instant("RegisterCol.errorMsg3"));
                      this.loading=false;
                        });
                   }
               		
               	}
                

              },
              error => {
                 this.alertService.danger(this.translate.instant("RegisterCol.errorMsg1"));
                 this.loading=false;
                  
            }
        );
  }



}
