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

  showCol:boolean=true;

  dateSince:any;
  dateUntil:any;

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
  		this.coloniasService.recuperaVisitasGeneral('?usuario=' + user).subscribe(
                        data =>{
                        	this.listaVisitas=data["hydra:member"];
                            console.log(data);
                            for (let item of data["hydra:member"]){
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

                          console.log(data);


                          this.listaVisitasTerr=[];
                          for (let visita of data["hydra:member"]){
                            let date=new Date((visita["fecha"]));
                            let y=date.getFullYear();
                            let m=date.getMonth()+1;
                            let d=date.getUTCDate();

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

  	filtrar(coloniaId, user=0){
      let id= $( "#colonia option:selected" ).attr("id");
      if (id=="all"){
        this.recuperaVisitas(user);
      }else{
        this.coloniasService.recuperaVisitasGeneral('?colonia='+id + '&usuario=' + user).subscribe(
                        data =>{
                          this.listaVisitas=data["hydra:member"];

                        },
                        error=>{
                            console.log(error);
                        });
      }
  		
  	}


  	openLg(content) {
    this.modalService.open(content, { size: 'lg' });
  }

  	
          
	

}
