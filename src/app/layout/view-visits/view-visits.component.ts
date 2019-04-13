import { Component, OnInit } from '@angular/core';
import { ColoniasService } from '../../../services/colonias.service';
import { TerritoriosService } from '../../../services/territorios.service';

import { TranslateService } from '@ngx-translate/core';
import { AlertService } from 'ngx-alerts';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

declare var $:any;
@Component({
  selector: 'app-view-visits',
  templateUrl: './view-visits.component.html',
  styleUrls: ['./view-visits.component.scss']
})
export class ViewVisitsComponent implements OnInit {

	listaVisitas:any=[];
  listaVisitasTerr:any=[];


	colonias:any=[];
	coloniasId:any=[];
  territorios:any=[];
  territoriosId:any=[];

  showCol:boolean=true;

  dateSince:any;
  dateUntil:any;

  totalPages:any=0;

  	constructor(private translate: TranslateService,
                private coloniasService: ColoniasService,
                private territoriosService: TerritoriosService,
                public alertService: AlertService,
                private modalService: NgbModal) { }

  	ngOnInit() {
  		this.recuperaVisitas(0);
      this.recuperaVisitasTerritorio(0);
  	}

  	recuperaVisitas(user){
  		this.coloniasService.recuperaVisitasGeneral('?usuario=' + user ).subscribe(
                        data =>{
                        	this.listaVisitas=data["hydra:member"];

                          let last=data["hydra:view"]["hydra:last"];
                          last=last.substr(last.indexOf('page')+5); //Cogemos el substring a partir de page +5, es decir +4 (numero de letras de page) +1 para no coger el "=", es decir, +5
                          this.totalPages=last*10;

                            for (let item of data["hydra:member"]){
                              let date=new Date((item["fecha"]));
                              let y=date.getFullYear();
                              let m=date.getMonth()+1;
                              let d=date.getUTCDate()+1;

                              item["fecha"]=d +'/' + m + '/' + y;

                            	if (this.coloniasId.indexOf(item.colonia["id"])<0){
                            		this.colonias.push(item.colonia);
                            		this.coloniasId.push(item.colonia["id"]);

                            	}
                            }
                            //Tenemos que utilizar los Id's por separado porque indexOf(colonia) no lo detecta como el mismo objeto y no funciona

                        },
                        error=>{
                            console.log(error);
                        });
  	}

    recuperaVisitasTerritorio(user){
      this.territoriosService.recuperaVisitasGeneral('?usuario='+user).subscribe(
                        data =>{

                          
                          this.listaVisitasTerr=data["hydra:member"];
                          for (let visita of data["hydra:member"]){
                            let date=new Date((visita["fecha"]));
                            let y=date.getFullYear();
                            let m=date.getMonth()+1;
                            let d=date.getUTCDate()+1;

                            let h=date.getHours();
                            let min=date.getMinutes();
                            let s=date.getSeconds();

                            visita["fecha"]=d +'/' + m + '/' + y;
                            visita["hora"]=h +':' + min + ':' + s;

                            this.listaVisitasTerr.push(visita);

                            if (this.territoriosId.indexOf(visita.territorio["id"])<0){
                                this.territorios.push(visita.territorio);
                                this.territoriosId.push(visita.territorio["id"]);

                              }


                          }
                        },
                        error=>{
                            console.log(error);
                        });

      console.log(this.listaVisitasTerr);
    }

  	filtrar(user=0, page){
      let id= $( "#colonia option:selected" ).attr("id");
     
      let busqueda='?usuario='+user;

      if (id!="all"){
        busqueda=busqueda+'&colonia='+id;
        
      }
       this.dateSince!=undefined ? busqueda=busqueda+'&fecha[after]='+this.dateSince.year+'-'+this.dateSince.month+'-'+this.dateSince.day : busqueda;
       this.dateUntil!=undefined ? busqueda=busqueda+'&fecha[before]='+this.dateUntil.year+'-'+this.dateUntil.month+'-'+this.dateUntil.day : busqueda;

       page ? busqueda=busqueda+'&page='+page : busqueda;

      this.listaVisitas=[];
      this.coloniasService.recuperaVisitasGeneral(busqueda).subscribe(
                        data =>{
                         

                          let last=data["hydra:view"]["hydra:last"];
                          last=last.substr(last.indexOf('page')+5); //Cogemos el substring a partir de page +5, es decir +4 (numero de letras de page) +1 para no coger el "=", es decir, +5
                          this.totalPages=last*10;

                          for (let visita of data["hydra:member"]){
                            let date=new Date((visita["fecha"]));
                            let y=date.getFullYear();
                            let m=date.getMonth()+1;
                            let d=date.getUTCDate()+1;

                            visita["fecha"]=d +'/' + m + '/' + y;

                            this.listaVisitas.push(visita);

                          }



                        },
                        error=>{
                            console.log(error);
                        });
  		
  	}




    filtrarTerr(user=0, page){
      let id= $( "#territorio option:selected" ).attr("id");
     
      let busqueda='?usuario='+user;

      if (id!="all"){
        busqueda=busqueda+'&territorio='+id;
        
      }
       this.dateSince!=undefined ? busqueda=busqueda+'&fecha[after]='+this.dateSince.year+'-'+this.dateSince.month+'-'+this.dateSince.day : busqueda;
       this.dateUntil!=undefined ? busqueda=busqueda+'&fecha[before]='+this.dateUntil.year+'-'+this.dateUntil.month+'-'+this.dateUntil.day : busqueda;

      page ? busqueda=busqueda+'&page='+page : busqueda;

      this.listaVisitasTerr=[];

      this.territoriosService.recuperaVisitasGeneral(busqueda).subscribe(
                        data =>{
                         

                          let last=data["hydra:view"]["hydra:last"];
                          last=last.substr(last.indexOf('page')+5); //Cogemos el substring a partir de page +5, es decir +4 (numero de letras de page) +1 para no coger el "=", es decir, +5
                          this.totalPages=last*10;

                          for (let visita of data["hydra:member"]){
                            let date=new Date((visita["fecha"]));
                            let y=date.getFullYear();
                            let m=date.getMonth()+1;
                            let d=date.getUTCDate()+1;

                            let h=date.getHours();
                            let min=date.getMinutes();
                            let s=date.getSeconds();

                            visita["fecha"]=d +'/' + m + '/' + y;
                            visita["hora"]=h +':' + min + ':' + s;


                            this.listaVisitasTerr.push(visita);

                          }



                        },
                        error=>{
                            console.log(error);
                        });
      
    }


  	openLg(content) {
    this.modalService.open(content, { size: 'lg' });
  }

  limpiar(){
    this.dateSince=undefined;
    this.dateUntil=undefined;
  }

  pageChanged(page) {
    this.filtrar(0,page);
  }

  pageChangedTerr(page) {
    this.filtrarTerr(0,page);
  }
  	
          
	

}
