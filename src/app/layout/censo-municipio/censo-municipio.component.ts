import { Component, OnInit} from '@angular/core';
import { SeoApisService } from '../../../services/seo-apis.service';
import { ColoniasService } from '../../../services/colonias.service';
import { TranslateService } from '@ngx-translate/core';
import { AlertService } from 'ngx-alerts';

declare var $:any;

@Component({
  selector: 'app-censo-municipio',
  templateUrl: './censo-municipio.component.html',
  styleUrls: ['./censo-municipio.component.scss']
})
export class CensoMunicipioComponent implements OnInit {

  listaCCAA:any[]= [];
  listaTemporadas:any[]= [];
  listaProv:any[]= [];
  listaMun:any[]= [];  
  listaColDisponibles:any[]= [];
  listaColAsignadas:any[]= [];
  totalPages:any=0;
  advancedPagination: number;
    
  constructor(private translate: TranslateService,
                private seoService: SeoApisService,
                private coloniasService: ColoniasService,
                public alertService: AlertService) { }

  ngOnInit() {
  }
  
   recuperaTemporadas(){
    this.coloniasService.getTemporadas().subscribe(
      data=>{
        
        for (let item of data){
          
            this.listaTemporadas.push(item["anno"]);
          
        }
        console.log(this.listaTemporadas);
      },
      error=>{
        console.log(error);
      })
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
  
  buscarDisponibles(pageNumber){
    
    let busqueda="&municipioAsignado=null&temporada="+$("#temporada").val()+"&municipio="+$( "#selectMunicipio option:selected" ).attr("value");
    
     this.coloniasService.recuperaColoniasFiltered(pageNumber, busqueda).subscribe(
              data => {
                this.listaColDisponibles=data["hydra:member"];
                let last=data["hydra:view"]["hydra:last"];

                if (last != undefined){
                  last=last.substr(last.indexOf('page')+5); //Cogemos el substring a partir de page +5, es decir +4 (numero de letras de page) +1 para no coger el "=", es decir, +5
                  this.totalPages=last*10; 
                }else{
                  this.totalPages=0;
                }
              },
              error => {
                  this.alertService.warning(this.translate.instant("ViewCol.errorMsg1"));
                  
            }
        );
    
  
  }
  buscarAsignadas(){
    //recuperar  datos de un unico censo
  }
  
  editar(){
   //cambios en campo completo de cada colonia, por lo que editar colonia
    //cambios de campo completo de municpio, opr lo que editar censomucnipio
    //cambiso en colonias asignadas y disponibles, editar censomunicipio
  }
  
   pageChanged(page) {
    this.buscarDisponibles(page);

  }
}
