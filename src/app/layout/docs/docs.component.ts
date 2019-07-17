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

  constructor(private translate: TranslateService,
                private coloniasService: ColoniasService,
                private territoriosService: TerritoriosService,
                public alertService: AlertService) { }

  ngOnInit() {

  	this.recuperaDocsColonia();
  	this.recuperaDocsTerritorio();
  }


  recuperaDocsColonia(){

  	this.coloniasService.recuperaDocs().subscribe(
                        data =>{
                        	console.log(data);
                        },
                        error=>{
                        	console.log(error);
                        });

  }


  recuperaDocsTerritorio(){
  	this.territoriosService.recuperaDocs().subscribe(
                        data =>{
                        	console.log(data);
                        },
                        error=>{
                        	console.log(error);
                        });

  }
  

}
