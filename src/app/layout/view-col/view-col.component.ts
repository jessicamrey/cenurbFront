import { Component, OnInit, Input} from '@angular/core';
import { ColoniasService } from '../../../services/colonias.service';
import { SeoApisService } from '../../../services/seo-apis.service';
import { TranslateService } from '@ngx-translate/core';
import { AlertService } from 'ngx-alerts';
import { Colonia } from '../../../models/colonia';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
declare var $:any;


@Component({
  selector: 'app-view-col',
  templateUrl: './view-col.component.html',
  styleUrls: ['./view-col.component.scss'],


})


//Ejemplo en: http://embed.plnkr.co/TOi5T5h6ZOu3XpNdGMy8/
export class ViewColComponent implements OnInit {

    title: string = 'My first AGM project';
  	lat: number = 51.678418;
  	lng: number = 7.809007;
    	
	  listaColonias:any[]= [];
	  showList:boolean=true;
	  totalPages:any=0;
    advancedPagination: number;
    closeResult: string;
    listaCCAA:any[]= [];
    listaProv:any[]= [];
    listaMun:any[]= [];
    busqueda:string;
    filtered:boolean=false;

  	constructor(private translate: TranslateService,
                private coloniasService: ColoniasService,
                public alertService: AlertService,
                private modalService: NgbModal,
                private seoService: SeoApisService) { 
  		this.advancedPagination = 1;
  	}

  	ngOnInit() {
      this.recuperaCCAA();
  		this.recuperaColonias(1);
  	}


  	recuperaColonias(pageNumber){
  		this.coloniasService.recuperaColonias(pageNumber).subscribe(
              data => {
                this.listaColonias=data["hydra:member"];
                let last=data["hydra:view"]["hydra:last"];
                last=last.substr(last.indexOf('page')+5); //Cogemos el substring a partir de page +5, es decir +4 (numero de letras de page) +1 para no coger el "=", es decir, +5
                this.totalPages=last*10;
                console.log(data);
                console.log(this.listaColonias);
              },
              error => {
                  this.alertService.warning(this.translate.instant("ViewCol.errorMsg1"));
                  
            }
        );
  	}


   pageChanged(page) {
    this.recuperaColonias(page);
  }

   pageChangedFiltered(page) {
    this.recuperaConFiltros(this.busqueda,page);
  }

  openLg(content) {
    this.modalService.open(content, { size: 'lg' });
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

  getDatosBusqueda(){
    let ccaa=$( "#selectCCAA option:selected" ).attr("value");
    let prov=$( "#selectProvincia option:selected" ).attr("value");
    let mun=$( "#selectMunicipio option:selected" ).attr("value");
    let nombre=$("#nombre").val();
    let temporada=$("#temporada").val();
    let centro= $("#nombreCentro").val();
    let cod= $("#cod").val();
    let vacio=$("#vacio").is(":checked");

     let busqueda='';

    ccaa.length > 0 ? busqueda= busqueda + '&ccaa=' + ccaa : busqueda;
    prov != undefined && prov !='-' ? busqueda= busqueda + '&provincia=' + prov : busqueda;
    mun != undefined && mun !='-' ? busqueda= busqueda + '&municipio=' + mun : busqueda;
    nombre.length > 0 ? busqueda= busqueda + '&nombre=' + nombre : busqueda;
    centro.length > 0 ? busqueda= busqueda + '&nombreCentro=' + centro : busqueda;
    temporada.length > 0 ? busqueda= busqueda + '&temporada=' + temporada : busqueda;
    cod.length > 0 ? busqueda= busqueda + '&id=' + cod : busqueda;
    vacio != false ? busqueda= busqueda + '&vacio=true' : busqueda;

    console.log(busqueda);

    if (busqueda.length>0){ //solo recuperamos cuando haya algun dato para buscar
      this.busqueda=busqueda;
      this.filtered=true;
      this.recuperaConFiltros(busqueda, 1);
    }else{
      //alertar de introducir datos
    }

    
  }

  recuperaConFiltros(busqueda, pageNumber){
   this.coloniasService.recuperaColoniasFiltered(pageNumber, busqueda).subscribe(
              data => {
                this.listaColonias=data["hydra:member"];
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

}
