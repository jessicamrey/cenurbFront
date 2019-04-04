import { Component, OnInit} from '@angular/core';
import { SeoApisService } from '../../../services/seo-apis.service';
import { TerritoriosService } from '../../../services/territorios.service';
import { TranslateService } from '@ngx-translate/core';
import { AlertService } from 'ngx-alerts';
import { Colonia } from '../../../models/colonia';
import { LocNidos } from '../../../models/loc-nidos';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
declare var $:any;

@Component({
  selector: 'app-register-terr',
  templateUrl: './register-terr.component.html',
  styleUrls: ['./register-terr.component.scss']
})
export class RegisterTerrComponent implements OnInit {

  	registerForm: FormGroup;

  	listaCCAA:any[]= [];
	listaTemporadas:any[]= [];
	listaProv:any[]= [];
	listaMun:any[]= [];
	listaTipoProp:any[]= [];
	listaTipoEd:any[]= [];

  	constructor(private translate: TranslateService,
                private seoService: SeoApisService,
                private territoriosService: TerritoriosService,
                public alertService: AlertService,
                private formBuilder: FormBuilder) { }

  	ngOnInit() {
  		this.recuperaTemporadas();
	  	this.recuperaCCAA();
	  	this.recuperaTipoProp();
	  	this.recuperaTipoEd();

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


  	recuperaTemporadas(){
    this.territoriosService.getTemporadas().subscribe(
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

}
