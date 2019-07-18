import { Component, OnInit } from '@angular/core';
import { ColoniasService } from '../../../services/colonias.service';
import { TerritoriosService } from '../../../services/territorios.service';

import { TranslateService } from '@ngx-translate/core';
import { AlertService } from 'ngx-alerts';

@Component({
  selector: 'app-docs',
  templateUrl: './docs.component.html',
  styleUrls: ['./docs.component.scss']
})
export class DocsComponent implements OnInit {

  loading=false;
  listaColoniales:any=[];
  listaNoColoniales:any=[];
  constructor(private translate: TranslateService,
                private coloniasService: ColoniasService,
                private territoriosService: TerritoriosService,
                public alertService: AlertService) { }

  ngOnInit() {

  	this.recuperaDocsColonia();
  	this.recuperaDocsTerritorio();
  }


  recuperaDocsColonia(){
    this.loading=true;
  	this.coloniasService.recuperaDocs().subscribe(
                        data =>{
                          this.listaColoniales=data;
                          this.alertService.success(this.translate.instant("Docs.infoMsg1"));
                        	console.log(data);
                          this.loading=false;
                        },
                        error=>{
                          this.alertService.success(this.translate.instant("Docs.errorMsg1"));
                        	console.log(error);
                          this.loading=false;
                        });

  }


  recuperaDocsTerritorio(){
    this.loading=true;
  	this.territoriosService.recuperaDocs().subscribe(
                        data =>{
                          this.listaNoColoniales=data;
                          this.alertService.success(this.translate.instant("Docs.infoMsg2"));
                        	console.log(data);
                          this.loading=false;
                        },
                        error=>{
                          this.alertService.success(this.translate.instant("Docs.errorMsg2"));
                        	console.log(error);
                          this.loading=false;
                        });

  }
  

}
