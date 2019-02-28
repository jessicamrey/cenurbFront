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
  otras:boolean =false;

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

  nuevaColonia(){
  	let colonia=new Colonia();
  	let locNidos= new LocNidos();
  	//Iniciamos los valores para la nueva colonia:

  	locNidos.setFachada($("#fachada").is(":checked"));
  	locNidos.setTrasera($("#trasera").is(":checked"));
  	locNidos.setLatDer($("#latDer").is(":checked"));
  	locNidos.setLatIzq($("#latIzq").is(":checked"));

  	console.log(locNidos);

  	colonia.setNombre(this.registerForm.get("nombre").value);
  	colonia.setNombreCentro(this.registerForm.get("nombreCentro").value);
  	colonia.setTemporada(this.registerForm.get("temporada").value);
  	colonia.setCcaa(this.registerForm.get("ccaa").value);
  	colonia.setProvincia(this.registerForm.get("provincia").value);
  	colonia.setMunicipio(this.registerForm.get("municipio").value);
  	colonia.setBarrio(this.registerForm.get("barrio").value);
  	colonia.setCalleNumPiso(this.registerForm.get("calleNumPiso").value);
  	colonia.setTipoEdificio(this.registerForm.get("tipoEdificio").value);
  	colonia.setTipoPropiedad(this.registerForm.get("tipoPropiedad").value);
  	colonia.setLocNidos(locNidos);


  	//ahora asiganamos la especie seleccionada y el usuario logeado.

  	console.log(colonia);


  }



}
