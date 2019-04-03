import { Component, OnInit } from '@angular/core';
import { ColoniasService } from '../../../services/colonias.service';
import { TranslateService } from '@ngx-translate/core';
import { AlertService } from 'ngx-alerts';
import { SeoApisService } from '../../../services/seo-apis.service';


@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
	loading=false;
	annoChartData:any=[];
	annoChartLabels:string[]=[];
	ccaaChartData:any=[];
	ccaaChartLabels:string[]=[];
	provChartData:any=[];
	provChartLabels:string[]=[];
	listaCCAA:any=[];
  listaProvinciasLabels:any=[];
  listaProvinciasData:any=[];
  especie=parseInt(JSON.parse(localStorage.getItem('especie'))["especie_id"]);
// bar chart
    public barChartOptions: any = {
        scaleShowVerticalLines: false,

        responsive: true
    };

    public barChartTypeH: string = 'horizontalBar';
    public barChartType: string = 'bar';

    public barChartLegend: boolean = true;



  constructor(private translate: TranslateService,
                private coloniasService: ColoniasService,
                public alertService: AlertService,
                private seoService: SeoApisService) { }

  ngOnInit() {
  	this.statsAnno();
  	this.statsCcca();


  }


          

  statsAnno(){

  	let dataList:any=[];


//TODO: recuperar especie de localstorage, recuperar temporada de nueva entidad
  	this.coloniasService.getStatsAnno(this.especie, 2019).subscribe(
                        data =>{
                          console.log(data);
                        	for (let item of data){
                        		dataList.push(item["1"]);
                        		this.annoChartLabels.push(item["anno"]);
                        	}
                        	this.annoChartData.push(
                        		{data: dataList, label: "Avion comun"}
                        		);
                        	

                        },
                        error=>{
                            console.log(error);
                        });


  }

  statsCcca(){
  	

  	//Primero recuperamos todas las comunidades, ya que tienen que estar todas en el grafico, aunque su dato sea 0

  	this.recuperaCCAA();


  }

  statsProvincia(){
   	
    this.loading=true;
    let finish=this.listaCCAA.length;
    let init=0;
   for (let ccaa of this.listaCCAA){
       this.coloniasService.getStatsProvincia(this.especie, 2019, ccaa["DEN_COM"]).subscribe(

                        data =>{
                          let dataList:any=[];
                          for (let item of data){
                                  dataList[this.listaProvinciasLabels[item["ccaa"]].indexOf(item["provincia"])]=item["1"];

                                  
                          }
                                
                           this.listaProvinciasData[ccaa["DEN_COM"]]=
                                  [{data: dataList, label: "Avion comun"}]
                           init++;
                             if (init==finish){
                               this.loading=false;
                             }
                        },
                        error=>{
                            this.loading=false;
                            console.log(error);
                        });
      
   }
  }



   recuperaCCAA(){
   	let dataList:any=[];
    this.seoService.getCCAA().subscribe(
              data => {
                this.listaCCAA=data;

                //Una vez que las hemos recuperado sin error, procedemos a obtener sus estadisticas
                for (let ccaa of data){
                	this.ccaaChartLabels.push(ccaa["DEN_COM"]);

                  this.recuperaProvincia(ccaa["ID_COM"],ccaa["DEN_COM"]);
                }


                this.statsProvincia();
			  	this.coloniasService.getStatsCcaa(this.especie, 2019).subscribe(
			                        data =>{
			                            for (let item of data){
			                        		dataList[this.ccaaChartLabels.indexOf(item["ccaa"])]=item["1"];
			                        		
			                        	}
			                        	this.ccaaChartData.push(
			                        		{data: dataList, label: "Avion comun"}
			                        		);

			                        },
			                        error=>{
			                            console.log(error);
			                        });


              },
              error => {
                  this.alertService.warning(this.translate.instant("Dashboard.errorGetCCAA"));
                  
            }
        );
  }

  recuperaProvincia(idCom, den){
    this.seoService.getProvincia(idCom).subscribe(
              data => {

                let lista:any=[];
                for (let item of data){
                  lista.push(item["DEN_PROV"]);
                }
                this.listaProvinciasLabels[den]=lista;
              },
              error => {

                  this.alertService.warning(this.translate.instant("Dashboard.errorGetProv"));
                  
            }
        );

  }

  recuperaTemporadas(){
  	
  }

}
