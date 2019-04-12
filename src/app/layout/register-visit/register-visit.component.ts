import { Component, OnInit } from '@angular/core';
import { ColoniasService } from '../../../services/colonias.service';
import { TerritoriosService } from '../../../services/territorios.service';

import { TranslateService } from '@ngx-translate/core';
import { AlertService } from 'ngx-alerts';
import { Colonia } from '../../../models/colonia';
import { Territorio } from '../../../models/territorio';
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
  listaTerr:any=[];
	col:Colonia= new Colonia();
  terr:Territorio= new Territorio();
  found:boolean=false;
  foundTerr:boolean=false;
  selected:boolean=false;
  name:any;
  loadingCol:boolean=false;
  loadingTerr:boolean=false;
  	constructor(private translate: TranslateService,
                private coloniasService: ColoniasService,
                private territoriosService: TerritoriosService,
                public alertService: AlertService,
                private modalService: NgbModal) { }

  	ngOnInit() {
  		this.recuperaColoniasFavoritas(0);
      this.recuperaTerritoriosFavoritas(0);
      if (JSON.parse(localStorage.getItem('especie'))){
            this.selected=true;
            this.name=JSON.parse(localStorage.getItem('especie'))["especie"];
        }
  	}


  	recuperaColoniasFavoritas(userId){
      this.loadingCol=true;
  		this.coloniasService.recuperaFavoritos(userId).subscribe(
                        data =>{
                        	this.listaCol=data;
                            console.log(data);
                            this.loadingCol=false;
                        },
                        error=>{
                            console.log(error);
                            this.loadingCol=false;
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


    buscarTerritorio(){
      let id=$("#terrId").val();
      this.territoriosService.recuperaTerritorio(id).subscribe(
        data=>{
          this.terr=data;
          this.alertService.success(this.translate.instant("RegisterVisit.foundTerr"));
          this.foundTerr=true;
        },
        error=>{
          this.foundTerr=false;
          this.alertService.warning(this.translate.instant("RegisterVisit.notFoundTerr"));
        }
      );

    }

    recuperaTerritoriosFavoritas(userId){
      this.loadingTerr=true;
      this.territoriosService.recuperaFavoritos(userId).subscribe(
                        data =>{
                          this.listaTerr=data;
                            console.log(data);
                            this.loadingTerr=false;

                        },
                        error=>{
                            console.log(error);
                            this.loadingTerr=false;

                        });
    }

    newFavoritoTerr(terrId){
    let data={
      "usuario":"0",
      "territorio":terrId
    };
     this.territoriosService.nuevoFavorito(data).subscribe(
              message => {
                console.log(message);
              },
              error => {
                console.log(error);
                  
            }
        );
    }

}
