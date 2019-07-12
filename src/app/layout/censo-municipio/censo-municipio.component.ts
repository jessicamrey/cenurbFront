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
  especie:any=parseInt(JSON.parse(localStorage.getItem('especie'))["especie_id"]);
  censo:any;
  noData:boolean=false;
  showCenso:boolean=false;

  constructor(private translate: TranslateService,
                private seoService: SeoApisService,
                private coloniasService: ColoniasService,
                public alertService: AlertService) { }

  ngOnInit() {
    this.recuperaTemporadas();
    this.recuperaCCAA();
  }
  
   recuperaTemporadas(){
    this.coloniasService.getTemporadas().subscribe(
      data=>{
        
        this.listaTemporadas=data;
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
    
    let busqueda="&temporada="+$("#temporada option:selected").attr("value")+
                "&municipio="+$( "#selectMunicipio option:selected" ).attr("value")+
                "&especie="+this.especie;
    
     this.coloniasService.recuperaColoniasFiltered(pageNumber, busqueda).subscribe(
              data => {
                console.log(data["hydra:member"]);
                this.listaColDisponibles=data["hydra:member"];

                for (let colonia of this.listaColDisponibles){
                  if(colonia.municipioAsignado!=null){

                   this.listaColAsignadas.push(colonia);
                   this.listaColDisponibles.splice(this.listaColDisponibles.indexOf(colonia), 1);

                  }
                }
                let last=data["hydra:view"]["hydra:last"];

                if (last != undefined){
                  last=last.substr(last.indexOf('page')+5); //Cogemos el substring a partir de page +5, es decir +4 (numero de letras de page) +1 para no coger el "=", es decir, +5
                  this.totalPages=last*10; 
                }else{
                  this.totalPages=0;
                }
              },
              error => {
                console.log(error);
                  this.alertService.warning(this.translate.instant("ViewCol.errorMsg1"));
                  
            }
        );
    
  
  }

  
  editar(){
   //cambios en campo completo de cada colonia, por lo que editar colonia
    //cambios de campo completo de municpio, opr lo que editar censomucnipio
    //cambiso en colonias asignadas y disponibles, editar censomunicipio
  }

  asignar(item){
    this.listaColDisponibles.splice(this.listaColDisponibles.indexOf(item), 1);
    this.listaColAsignadas.push(item);
    console.log(this.listaColDisponibles);
    console.log(this.listaColAsignadas);
  }

  desasignar(item){
    this.listaColAsignadas.splice(this.listaColAsignadas.indexOf(item), 1);
    this.listaColDisponibles.push(item);
    console.log(this.listaColDisponibles);
    console.log(this.listaColAsignadas);

  }
  
   pageChanged(page) {
    this.buscarDisponibles(page);

  }

  buscarCenso(){

    if( $( "#selectMunicipio option:selected" ).attr("value")=='all' || $( "#temporada option:selected" ).attr("id")=='all'){
      this.alertService.warning(this.translate.instant("CensoMunicipio.infoMsg1"));

    }else{
        this.coloniasService.getCensoMunicipio(this.especie, $( "#selectMunicipio option:selected" ).attr("value"),$( "#temporada option:selected" ).attr("id")).subscribe(
              data => {
                console.log(data);
               this.censo=data["hydra:member"];
               if(data["hydra:member"].length<=0){
                 this.noData=true;
                 this.showCenso=false;
               }else{
                 this.noData=false;
                 this.showCenso=true;
                 this.buscarDisponibles(1);
               }
                
              },
              error => {
                  this.alertService.warning(this.translate.instant("ViewCol.errorMsg1"));
                  
            }
        );
      }

  }

  nuevoCenso(){
    if( $( "#selectMunicipio option:selected" ).attr("value")=='all' || $( "#temporada option:selected" ).attr("id")=='all'){
      this.alertService.warning(this.translate.instant("CensoMunicipio.infoMsg1"));

    }else{
      let newCenso={
        'especie':     this.especie,
        'municipio':    $( "#selectMunicipio option:selected" ).attr("value"),
        'anno':        $( "#temporada option:selected" ).attr("value")
      }

      this.coloniasService.nuevoCensoMunicipio(newCenso).subscribe(
              data => {
                console.log(data);
                this.censo=data;
               this.noData=false;
                 this.showCenso=true;
                 this.buscarDisponibles(1);
                
              },
              error => {
                console.log(error);
                  this.alertService.warning(this.translate.instant("ViewCol.errorMsg1"));
                  
            }
        );


    }
  }
}
