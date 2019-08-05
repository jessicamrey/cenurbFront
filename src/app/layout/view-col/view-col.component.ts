import { Component, OnInit, Input} from '@angular/core';
import { ColoniasService } from '../../../services/colonias.service';
import { SeoApisService } from '../../../services/seo-apis.service';
import { TranslateService } from '@ngx-translate/core';
import { AlertService } from 'ngx-alerts';
import { Colonia } from '../../../models/colonia';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedServicesService } from '../../../services/shared-services.service';
import { AuthService } from '../../../services/auth.service';

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
    loading=false;
  mostrarDescargar:boolean=false;
  

  	constructor(private translate: TranslateService,
                private coloniasService: ColoniasService,
                public alertService: AlertService,
                private modalService: NgbModal,
                private seoService: SeoApisService,
                private sharedServices: SharedServicesService,
                private authService: AuthService) { 
  		this.advancedPagination = 1;
  	}

  	ngOnInit() {
      this.recuperaCCAA();
  		this.recuperaColonias(1);
      this.isAdmin();

  	}

    isAdmin(){
    this.authService.isAdmin().subscribe(
              data => {
                this.mostrarDescargar=data;
              },
              error => {
                  console.log(error);
                  
            }
        );
  }

    exportAsXLSX():void {

       let dataToExport:any=[];

       for (let position in this.listaColonias){

         if(this.filtered==false){
           let element={
           "Lista de colonias": this.listaColonias[position].nombre
           }
           dataToExport.push(element);

         }else{
           let element={
           "Lista de colonias (Filtrado)": this.listaColonias[position].nombre
           }
           dataToExport.push(element);
         }
         

       }
       this.sharedServices.exportAsExcelFile(dataToExport, 'sample');

}

    exportOneAsXLSX(item):void {

       //let dataToExport=JSON.parse(this.chartData[0]["data"]);
       let dataToExport:any=[];

      

       
           let element={
           "Nombre": item.nombre,
           "Codigo":  item.id,
           "Nombre del centro": item.nombreCentro,
           "Temporada":  item.temporada,
           "Localización":  item.municipio+','+item.provincia+','+item.ccaa,
           "Dirección": item.calleNumPiso+','+item.barrio,
           "Tipo de edificio": item.tipoEdificio.descripcion,
           "Tipo de propiedad": item.tipoPropiedad.Description
         };
           dataToExport.push(element);

           let nidosTitle={
             "Localización de los nidos": ""
           }
           dataToExport.push(nidosTitle);

           let nidos={
             
         
                                   "Fachada":item.locNidos.fachada,
                                   "Laterla Izq.":item.locNidos.lateralIzquierdo,
                                   "Lateral Der.":item.locNidos.lateralDerecho,
                                   "Trasera":item.locNidos.trasera,
                                   "Patio interior":item.locNidos.patioInferior
                                   } 
           
           
           dataToExport.push(nidos);

         
         

       
       this.sharedServices.exportAsExcelFile(dataToExport, 'sample');

    }


  	recuperaColonias(pageNumber){
      this.loading=true;
      let especie=parseInt(JSON.parse(localStorage.getItem('especie'))["especie_id"]);
  		this.coloniasService.recuperaColonias(pageNumber, especie).subscribe(
              data => {
                this.loading=false;
                this.listaColonias=data["hydra:member"];
                console.log(this.listaColonias);
                let last=data["hydra:view"]["hydra:last"];
                last=last.substr(last.indexOf('page')+5); //Cogemos el substring a partir de page +5, es decir +4 (numero de letras de page) +1 para no coger el "=", es decir, +5
                this.totalPages=last*10;
                console.log(data);
                
              },
              error => {
                this.loading=false;
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

  getDatosBusqueda(codigo, booleanParam){
    let ccaa=$( "#selectCCAA option:selected" ).attr("value");
    let prov=$( "#selectProvincia option:selected" ).attr("value");
    let mun=$( "#selectMunicipio option:selected" ).attr("value");
    let nombre=$("#nombre").val();
    let temporada=$("#temporada").val();
    let centro= $("#nombreCentro").val();
    let cod= $("#cod").val();
    let id= $("#idCol").val();
    let vacio=$("#vacio").is(":checked");

     let busqueda='';

    ccaa.length > 0 ? busqueda= busqueda + '&ccaa=' + ccaa : busqueda;
    prov != undefined && prov !='-' ? busqueda= busqueda + '&provincia=' + prov : busqueda;
    mun != undefined && mun !='-' ? busqueda= busqueda + '&municipio=' + mun : busqueda;
    nombre.length > 0 ? busqueda= busqueda + '&nombre=' + nombre : busqueda;
    centro.length > 0 ? busqueda= busqueda + '&nombreCentro=' + centro : busqueda;
    temporada.length > 0 ? busqueda= busqueda + '&temporada=' + temporada : busqueda;
    cod.length > 0 ? busqueda= busqueda + '&codColonia=' + cod : busqueda;
    id.length > 0 ? busqueda= busqueda + '&id=' + id : busqueda;
    vacio != false ? busqueda= busqueda + '&vacio=true' : busqueda;

    console.log(busqueda);

   
    //Buscamos el codigo de la colonia para que nos devuelva todas las temporadas
    if (booleanParam==true){
      let searchString='&codColonia='+codigo;
      this.filtered=true;
      this.recuperaConFiltros(searchString, 1);
    }else{
      this.busqueda=busqueda;
      this.filtered=true;
      this.recuperaConFiltros(busqueda, 1);
    }

    
  }

  recuperaConFiltros(busqueda, pageNumber){
    this.loading=true;
   this.coloniasService.recuperaColoniasFiltered(pageNumber, busqueda).subscribe(
              data => {
                this.loading=false;
                console.log(data);
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
                this.loading=false;
                  this.alertService.warning(this.translate.instant("ViewCol.errorMsg1"));
                  
            }
        );


  }

  newFavorito(colId){
    let data={
      "usuario":"0",
      "colonia":colId
    };
     this.coloniasService.nuevoFavorito(data).subscribe(
              message => {
                console.log(message);
              },
              error => {
                console.log(error);
                  
            }
        );
    }
  

}
