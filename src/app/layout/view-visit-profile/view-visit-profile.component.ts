import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ColoniasService } from '../../../services/colonias.service';
import { TranslateService } from '@ngx-translate/core';
import { AlertService } from 'ngx-alerts';



@Component({
  selector: 'app-view-visit-profile',
  templateUrl: './view-visit-profile.component.html',
  styleUrls: ['./view-visit-profile.component.scss']
})
export class ViewVisitProfileComponent implements OnInit {

	listaVisitas:any=[];

	colId:any;

	TablesawConfig = {
		i18n: {
			swipePreviousColumn: "The column before",
			swipeNextColumn: "The column after"
		},
		swipe: {
			horizontalThreshold: 45,
			verticalThreshold: 45
		}
	};
  	constructor(private translate: TranslateService,
                private coloniasService: ColoniasService,
                public alertService: AlertService,
                private route:ActivatedRoute) { 

  	
}

  	ngOnInit() {

  		this.route.params.subscribe(
  			params=>{
  				this.colId=params["colId"];
  				this.recuperaVisitas(params["colId"]);
  			});
  	}

  	recuperaVisitas(colId){
  		this.coloniasService.recuperaVisitasGeneral('?colonia='+colId).subscribe(
                        data =>{
                        	this.listaVisitas=data["hydra:member"];
                            console.log(this.listaVisitas);
                        },
                        error=>{
                            console.log(error);
                        });
  	}

}
