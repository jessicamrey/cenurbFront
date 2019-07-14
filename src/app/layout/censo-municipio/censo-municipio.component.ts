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
  loading:boolean=false;
  municipio:any;

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
    this.loading=true;
    let busqueda="&temporada="+$("#temporada option:selected").attr("value")+
                "&municipio="+$( "#selectMunicipio option:selected" ).attr("value")+
                "&especie="+this.especie;
    
     this.coloniasService.recuperaColoniasFiltered(pageNumber, busqueda).subscribe(
              data => {
                 this.loading=false;
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
                 this.loading=false;
                  this.alertService.warning(this.translate.instant("CensoMunicipio.errorMsg1"));
                  
            }
        );
    
  
  }

  
  editar(){
    this.loading=true;
    for (let asignada of this.listaColAsignadas){
      let datos={
        "municipioAsignado_id":this.censo[0].id
      }
      this.coloniasService.modificarColonia(asignada.id,datos).subscribe(
        data=>{
          this.loading=false;
        },
        error=>{
          this.loading=false;
          this.alertService.warning(this.translate.instant("CensoMunicipio.errorMsg1"));

        });
    }

    for (let disponible of this.listaColDisponibles){

      let datosD={
        "municipioAsignado_id": "null"
      }

      this.coloniasService.modificarColonia(disponible.id,datosD).subscribe(
        data=>{
          this.loading=false;
        },
        error=>{
          this.loading=false;
          this.alertService.warning(this.translate.instant("CensoMunicipio.errorMsg1"));

        });
    }
    
  }

  completar(param:boolean){
    this.loading=true;
    
      let datos={
        "completo": param
      }
      this.coloniasService.modificarCenso(this.censo[0].id,datos).subscribe(
        data=>{
          this.loading=false;
          this.censo[0]=data;
          console.log(data);
          this.alertService.success(this.translate.instant("CensoMunicipio.infoMsg5"));
        },
        error=>{
          this.loading=false;
          console.log(error);
          this.alertService.warning(this.translate.instant("CensoMunicipio.errorMsg1"));

        });
    

   
    
  }

  asignar(item){
    this.listaColDisponibles.splice(this.listaColDisponibles.indexOf(item), 1);
    this.listaColAsignadas.push(item);
  }

  desasignar(item){
    this.listaColAsignadas.splice(this.listaColAsignadas.indexOf(item), 1);
    this.listaColDisponibles.push(item);

  }
  
   pageChanged(page) {
    this.buscarDisponibles(page);

  }

  buscarCenso(){
    this.loading=true;
    if( $( "#selectMunicipio option:selected" ).attr("value")=='all' || $( "#temporada option:selected" ).attr("id")=='all'){
      this.alertService.warning(this.translate.instant("CensoMunicipio.infoMsg1"));
      this.loading=false;

    }else{
        this.coloniasService.getCensoMunicipio(this.especie, $( "#selectMunicipio option:selected" ).attr("value"),$( "#temporada option:selected" ).attr("id")).subscribe(
              data => {

                this.loading=false;
               this.censo=data["hydra:member"];
               this.municipio=$( "#selectMunicipio option:selected" ).attr("value");
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
                this.loading=false;
                this.alertService.warning(this.translate.instant("CensoMunicipio.errorMsg1"));
                  
            }
        );
      }

  }

  nuevoCenso(){
    this.loading=true;
    if( $( "#selectMunicipio option:selected" ).attr("value")=='all' || $( "#temporada option:selected" ).attr("id")=='all'){
      this.alertService.warning(this.translate.instant("CensoMunicipio.infoMsg1"));
      this.loading=false;
    }else{
      let newCenso={
        'especie':     this.especie,
        'municipio':    $( "#selectMunicipio option:selected" ).attr("value"),
        'anno':        $( "#temporada option:selected" ).attr("value")
      }

      this.coloniasService.nuevoCensoMunicipio(newCenso).subscribe(
              data => {
                this.loading=false;
                this.censo=data;
               this.noData=false;
                 this.showCenso=true;
                 this.buscarDisponibles(1);
                 this.alertService.warning(this.translate.instant("CensoMunicipio.infoMsg6"));
                
              },
              error => {
                this.loading=false;
                 this.alertService.warning(this.translate.instant("CensoMunicipio.errorMsg1"));
                  
            }
        );


    }
  }
}
