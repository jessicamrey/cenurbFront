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
                          for (let item of data){
                            let lastChar = item.substr(item.length - 1);
                            if (lastChar!='.'){
                              let splited=item.split("/");
                              let name=splited[splited.length-1];
                              let dato={

                                "direccion":  item,
                                "name":      name
                              }
                              this.listaColoniales.push(dato);
                            }

                          }
                          this.alertService.success(this.translate.instant("Docs.infoMsg1"));
                          this.loading=false;
                        },
                        error=>{
                          this.alertService.success(this.translate.instant("Docs.errorMsg1"));
                          this.loading=false;
                        });

  }


  recuperaDocsTerritorio(){
    this.loading=true;
  	this.territoriosService.recuperaDocs().subscribe(
                        data =>{
                          for (let item of data){

                            let lastChar = item.substr(item.length - 1);
                            if (lastChar!='.'){
                               let splited=item.split("/");
                              let name=splited[splited.length-1];
                              let dato={

                                "direccion":  item,
                                "name":      name
                              }
                              this.listaNoColoniales.push(dato);
                            }

                          }
                          this.alertService.success(this.translate.instant("Docs.infoMsg2"));
                          this.loading=false;
                        },
                        error=>{
                          this.alertService.success(this.translate.instant("Docs.errorMsg2"));
                          this.loading=false;
                        });

  }
  

}
