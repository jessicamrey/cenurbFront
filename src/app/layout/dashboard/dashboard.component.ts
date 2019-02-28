import { Component, OnInit } from '@angular/core';
import { SeoApisService } from '../../../services/seo-apis.service';
import { TranslateService } from '@ngx-translate/core';
import { AlertService } from 'ngx-alerts';


@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    listaCol:any[]= [];

    constructor(private translate: TranslateService,
                private seoService: SeoApisService,
                public alertService: AlertService) {
      
       
    }

    ngOnInit() {
        this.recuperaColoniales();
    }

    recuperaColoniales(){
        this.seoService.listaColoniales().subscribe(
              data => {
                this.listaCol=data;
                console.log(this.listaCol);
              },
              error => {
                  this.alertService.warning(this.translate.instant("Dashboard.errorGetCol"));
                  
            }
        );
    }
}
