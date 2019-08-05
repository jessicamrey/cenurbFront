import { Component, OnInit} from '@angular/core';
import { SeoApisService } from '../../../services/seo-apis.service';
import { TerritoriosService } from '../../../services/territorios.service';
import { TranslateService } from '@ngx-translate/core';
import { AlertService } from 'ngx-alerts';
import { Territorio } from '../../../models/territorio';
import { LocNidosTerr } from '../../../models/loc-nidos-terr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
declare var $:any;

@Component({
  selector: 'app-register-terr',
  templateUrl: './register-terr.component.html',
  styleUrls: ['./register-terr.component.scss']
})
export class RegisterTerrComponent implements OnInit {

  	registerForm: FormGroup;
    isEdit:boolean=false;
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
	 longitude :any=parseFloat(localStorage.getItem('longitude'));
  latitude :any=parseFloat(localStorage.getItem('latitude'));

  codTerritorio:number;
  type:any=0;
datos:any={};
terrId:any;
territorio:Territorio= new Territorio();
locNidos:LocNidosTerr= new LocNidosTerr();
/*
  *type= 0 ->nueva colonia
  *1->nueva temporada
  *2->editar existente
  */

 markers = [{ latitude: parseFloat(localStorage.getItem('latitude')),
             longitude: parseFloat(localStorage.getItem('longitude'))}];

  	constructor(private translate: TranslateService,
                private seoService: SeoApisService,
                private territoriosService: TerritoriosService,
                public alertService: AlertService,
                private formBuilder: FormBuilder,
                private route:ActivatedRoute) { }

  	ngOnInit() {
  		//this.getLocalizacion();

       this.route.params.subscribe(
        params=>{
          this.terrId=params["terrId"];
          this.type=parseInt(params["type"]);
          
            if(params["terrId"]!=0){
               this.recuperaDatosTerritorio(params["terrId"]);
            }
            if(params["type"]==1 || params["type"]==2){
              this.isEdit=true;
             
            }
        });


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


editarTerritorio(){

    this.locNidos.setFachada($("#fachada").is(":checked"));
    this.locNidos.setTrasera($("#trasera").is(":checked"));
    this.locNidos.setLatDer($("#latDer").is(":checked"));
    this.locNidos.setLatIzq($("#latIzq").is(":checked"));
    this.locNidos.setPatio($("#patio").is(":checked"));
    this.locNidos.setNumPiso(parseInt(this.registerForm.get("numPiso").value));
    this.locNidos.setEmplazamientoId(this.registerForm.get("emplazamiento").value);
    //Para el resumen
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


    this.datos={
      "nombre":        $( "#nombre" ).val(),
      "nombreCentro":  $( "#nombreCentro" ).val(),
      "locNidos":      this.locNidos,
      "tipoTerritorioId": this.registerForm.get("tipo").value,
      "amenazada":        JSON.parse(this.registerForm.get("amenazada").value)
     
    }


  this.territoriosService.modificarTerritorio(this.terrId, this.datos).subscribe(
    data=>{
      console.log(data);
      this.alertService.success(this.translate.instant("Tooltip.successEdit"));
    },
    error=>{
      console.log(error);
      this.alertService.danger(this.translate.instant("Tooltip.errorEdit"));

    });
}


recuperaDatosTerritorio(terrId){
     this.territoriosService.recuperaTerritorio(terrId).subscribe(
            data=>{
            console.log(data);


           this.codTerritorio=data["codTerritorio"];
            this.territorio.setCcaa(data["ccaa"]);
            this.territorio.setProvincia(data["provincia"]);
            this.territorio.setMunicipio(data["municipio"]);
            this.territorio.setBarrio(data["barrio"]);


            data["locNidos"]["fachada"]==true ? document.getElementById("fachada").setAttribute("checked", "") : undefined;
            data["locNidos"]["trasera"]==true ? document.getElementById("trasera").setAttribute("checked", ""): undefined;
            data["locNidos"]["lateralDerecho"]==true ? document.getElementById("latDer").setAttribute("checked", ""): undefined;
            data["locNidos"]["lateralIzquierdo"]==true ? document.getElementById("latIzq").setAttribute("checked", ""): undefined;
            data["locNidos"]["patioInterior"]==true ? document.getElementById("patio").setAttribute("checked", ""): undefined;

            document.getElementById("selectCCAA").setAttribute("disabled", "true");
            document.getElementById("selectProvincia").setAttribute("disabled", "true");
            document.getElementById("selectMunicipio").setAttribute("disabled", "true");
            document.getElementById("barrio").setAttribute("disabled", "true");
            
            
            if(this.type==2){
              //No podremos editar la temporada si editamos la colonia
              document.getElementById("temporada").setAttribute("disabled", "true");
              document.getElementById("tipoProp").setAttribute("disabled", "true");
              document.getElementById("tipoEd").setAttribute("disabled", "true");
              document.getElementById("calleNumPiso").setAttribute("disabled", "true");
            }
            
console.log(this.territorio);
            //this.markers=[{ latitude: data["locNidos"]["lat"], longitude: data["locNidos"]["lon"] }];
            },
            error=>{
              console.log(error);
            })
  
  }



  	recuperaTemporadas(){
    this.territoriosService.getTemporadas().subscribe(
      data=>{
        
        for (let item of data["hydra:member"]){
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

//https://mdbootstrap.com/docs/angular/advanced/google-maps/
placeMarker(position: any) {
const lat = position.coords.lat;
const lng = position.coords.lng;

this.markers=[{ latitude: lat, longitude: lng }];
}

registraTerritorio(nuevaTemporada){

  	//PASO 1 ->Información general del territorio


     if(nuevaTemporada==true){
      this.territorio.setCodTerritorio(this.codTerritorio);
    }else{
      this.territorio.setCcaa(this.registerForm.get("ccaa").value);
      this.territorio.setProvincia(this.registerForm.get("provincia").value);
      this.territorio.setMunicipio(this.registerForm.get("municipio").value);
      this.territorio.setBarrio(this.registerForm.get("barrio").value);
    }

  	this.territorio.setUsuario("pruebaUsu");
    this.locNidos.setUsuario("pruebaUsu");
  	this.territorio.setEspecie(parseInt(JSON.parse(localStorage.getItem('especie'))["especie_id"]));
  	

  	
  	this.territorio.setNombre(this.registerForm.get("nombre").value);
  	this.territorio.setNombreCentro(this.registerForm.get("nombreCentro").value);
  	this.territorio.setAnno(parseInt(this.registerForm.get("temporada").value, 10));
  	this.territorio.setCalleNumPiso(this.registerForm.get("calleNumPiso").value);
  	this.territorio.setTipoEdificio(this.registerForm.get("tipoEdificio").value);
  	this.territorio.setTipoPropiedad(this.registerForm.get("tipoPropiedad").value);
  	this.territorio.setTipoTerritorioId(this.registerForm.get("tipo").value);
  	this.territorio.setAmenazada(JSON.parse(this.registerForm.get("amenazada").value));


  	//PASO 2 -> Información sobre los nidos

  	

  	this.locNidos.setFachada($("#fachada").is(":checked"));
  	this.locNidos.setTrasera($("#trasera").is(":checked"));
  	this.locNidos.setLatDer($("#latDer").is(":checked"));
  	this.locNidos.setLatIzq($("#latIzq").is(":checked"));
  	this.locNidos.setPatio($("#patio").is(":checked"));
    console.log(this.markers);
    this.locNidos.setLat(this.markers["0"]["latitude"]);
    this.locNidos.setLon(this.markers["0"]["longitude"]);
    this.locNidos.setNumPiso(this.registerForm.get("numPiso").value);
  	this.locNidos.setEmplazamientoId(this.registerForm.get("emplazamiento").value);


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


  	console.log(this.territorio);
  	console.log(this.locNidos);


  	 this.loading=true;
  		//Empezamos registrando el territorio
  	  	this.territoriosService.nuevoTerritorio(this.territorio).subscribe(
              data => {
              	//Cuando el territorio es creado, obtenemos su id para completar los siguientes pasos
                this.alertService.success(this.translate.instant("RegisterTerr.successMsg1"));

                //Completamos datos de nidos
                this.territoriosService.completaTerritorioNidos(this.locNidos,data["id"]).subscribe(
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
