import { Component, OnInit, Input} from '@angular/core';
import { ColoniasService } from '../../../services/colonias.service';
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

  	constructor(private translate: TranslateService,
                private coloniasService: ColoniasService,
                public alertService: AlertService,
                private modalService: NgbModal) { 
  		this.advancedPagination = 1;
  	}

  	ngOnInit() {
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



    openWindowCustomClass(content) {
    this.modalService.open(content, { windowClass: 'dark-modal' });

  }

   pageChanged(page) {
    this.recuperaColonias(page);
  }



}
