import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { SeoApisService } from '../../../services/seo-apis.service';
import { TranslateService } from '@ngx-translate/core';
import { AlertService } from 'ngx-alerts';

@Component({
  selector: 'app-dashboard-terr',
  templateUrl: './dashboard-terr.component.html',
  styleUrls: ['./dashboard-terr.component.scss']
})
export class DashboardTerrComponent implements OnInit {
	
  listaNoCol:any[]= [];

  constructor(private translate: TranslateService,
                private seoService: SeoApisService,
                public alertService: AlertService) { }

  ngOnInit() {
  	this.recuperaNoColoniales();
  }

  recuperaNoColoniales(){
        this.seoService.listaNoColoniales().subscribe(
              data => {
                this.listaNoCol=data;
                console.log(this.listaNoCol);
              },
              error => {
                  this.alertService.warning(this.translate.instant("Dashboard.errorGetNoCol"));
                  
            }
        );
    }

}
