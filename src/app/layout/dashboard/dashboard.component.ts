import { Component, OnInit } from '@angular/core';
import { SeoApisService } from '../../../services/seo-apis.service';
import { ColoniasService } from '../../../services/colonias.service';

import { TranslateService } from '@ngx-translate/core';
import { AlertService } from 'ngx-alerts';


@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    listaCol:any[]= [];
    numEspecies:number;
    numCol:number;
    numTerr:number;
    numUsers:number;
    loading=false;
    year:any;

    constructor(private translate: TranslateService,
                private seoService: SeoApisService,
                private coloniasService: ColoniasService,
                public alertService: AlertService) {
      
       
    }

    ngOnInit() {
        this.recuperaColoniales();
        this.dashboardData();
         let date=new Date();
        this.year=date.getFullYear();
        
    }

    recuperaColoniales(){
        this.loading=true;
        this.seoService.listaColoniales().subscribe(
              data => {
                  this.loading=false;
                this.listaCol=data;
                this.numEspecies=this.listaCol.length;
                console.log(this.listaCol);
              },
              error => {
                  this.loading=false;
                  this.alertService.danger(this.translate.instant("Dashboard.errorGetCol"));
                  
            }
        );
    }

    dashboardData(){
       let date=new Date();
        let year=date.getFullYear();
        this.coloniasService.getDashboardData(year).subscribe(
              data => {
                console.log(data);
                this.numCol=data[0][0]['1'];
                this.numTerr=data[1][0]['1'];
                this.numUsers=data[2][0]['1'];
                
              },
              error => {
                  console.log(error);
                  this.alertService.danger(this.translate.instant("Dashboard.errorGetCol"));
                  
            }
        );

    }

    seleccionar(nombre, id){
        let data={
            especie: nombre,
            especie_id: id 
        }
        this.coloniasService.selectColonia(data);
    }
}
