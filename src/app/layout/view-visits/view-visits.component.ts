import { Component, OnInit } from '@angular/core';
import { ColoniasService } from '../../../services/colonias.service';
import { TranslateService } from '@ngx-translate/core';
import { AlertService } from 'ngx-alerts';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-view-visits',
  templateUrl: './view-visits.component.html',
  styleUrls: ['./view-visits.component.scss']
})
export class ViewVisitsComponent implements OnInit {

	listaVisitas:any=[];

	colonias:any=[];
	coloniasId:any=[];

  	constructor(private translate: TranslateService,
                private coloniasService: ColoniasService,
                public alertService: AlertService,
                private modalService: NgbModal) { }

  	ngOnInit() {
  		this.recuperaVisitas();
  	}

  	recuperaVisitas(){
  		this.coloniasService.recuperaVisitas(0,'').subscribe(
                        data =>{
                        	this.listaVisitas=data;
                            console.log(data);
                            for (let item of data){
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

  	filtrar(coloniaId){
  		this.coloniasService.recuperaVisitas(0,'?colonia='+coloniaId).subscribe(
                        data =>{
                        	this.listaVisitas=data;

                        },
                        error=>{
                            console.log(error);
                        });
  	}


  	openLg(content) {
    this.modalService.open(content, { size: 'lg' });
  }

  	
          
	

}
