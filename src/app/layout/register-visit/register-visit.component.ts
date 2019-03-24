import { Component, OnInit } from '@angular/core';
import { ColoniasService } from '../../../services/colonias.service';
import { TranslateService } from '@ngx-translate/core';
import { AlertService } from 'ngx-alerts';
import { Colonia } from '../../../models/colonia';
import { Router } from '@angular/router';

import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

declare var $:any;
@Component({
  selector: 'app-register-visit',
  templateUrl: './register-visit.component.html',
  styleUrls: ['./register-visit.component.scss']
})
export class RegisterVisitComponent implements OnInit {

	listaCol:any[]= [];
	col:Colonia= new Colonia();
	found:boolean=false;
  	constructor(private translate: TranslateService,
                private coloniasService: ColoniasService,
                public alertService: AlertService,
                private modalService: NgbModal) { }

  	ngOnInit() {
  		this.recuperaColoniasFavoritas(0);
  	}


  	recuperaColoniasFavoritas(userId){
  		this.coloniasService.recuperaFavoritos(userId).subscribe(
                        data =>{
                        	this.listaCol=data;
                            console.log(data);
                        },
                        error=>{
                            console.log(error);
                        });
  	}

  	openLg(content) {
    	this.modalService.open(content, { size: 'lg' });
  	}

  	buscarColonia(){
  		let id=$("#colId").val();
  		this.coloniasService.recuperaColonia(id).subscribe(
  			data=>{
  				this.col=data;
  				this.alertService.success(this.translate.instant("RegisterVisit.found"));
  				this.found=true;
  				console.log(data);
  				console.log(this.col);
  			},
  			error=>{
  				this.found=false;
  				this.alertService.warning(this.translate.instant("RegisterVisit.notFound"));
  			}
  		);

  	}

}
