import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { SeoApisService } from '../../../services/seo-apis.service';
import { TranslateService } from '@ngx-translate/core';
import { AlertService } from 'ngx-alerts';
import { TerritoriosService } from '../../../services/territorios.service';
import { ColoniasService } from '../../../services/colonias.service';



@Component({
  selector: 'app-dashboard-terr',
  templateUrl: './dashboard-terr.component.html',
  styleUrls: ['./dashboard-terr.component.scss']
})
export class DashboardTerrComponent implements OnInit {
	
  listaNoCol:any[]= [];
  numEspecies:number;
    numCol:number;
    numTerr:number;
    numUsers:number;
    loading=false;
    year:any;

  constructor(private translate: TranslateService,
                private seoService: SeoApisService,
                public alertService: AlertService,
                private territoriosService: TerritoriosService,
                private coloniasService: ColoniasService) { }

  ngOnInit() {
  	this.recuperaNoColoniales();
    this.dashboardData();
         let date=new Date();
        this.year=date.getFullYear();

  }


  recuperaNoColoniales(){
    this.loading=true;
        this.seoService.listaNoColoniales().subscribe(
              data => {
                this.listaNoCol=data;
                this.numEspecies=this.listaNoCol.length;
                console.log(this.listaNoCol);
                this.loading=false;
              },
              error => {
                this.loading=false;
                  this.alertService.warning(this.translate.instant("Dashboard.errorGetNoCol"));
                  
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
        this.territoriosService.selectTerritorio(data);
    }
}

