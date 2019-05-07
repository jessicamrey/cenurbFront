import { Component, OnInit } from '@angular/core';
import { SeoApisService } from '../../../services/seo-apis.service';
import { TranslateService } from '@ngx-translate/core';
import { AlertService } from 'ngx-alerts';
import { TerritoriosService } from '../../../services/territorios.service';

declare var $:any;
@Component({
  selector: 'app-general-terr',
  templateUrl: './general-terr.component.html',
  styleUrls: ['./general-terr.component.scss']
})
export class GeneralTerrComponent implements OnInit {

    listaNoCol:any[]= [];
    listaCCAA:any[]= [];
    listaProv:any[]= [];
    listaTemporadas:any[]= [];
    listaTipos:any=[];

	  loading=false;
	  chartData:any=[];
	  dataList:any=[];
	  chartLabels:string[]=[];
  	especie=parseInt(JSON.parse(localStorage.getItem('especie'))["especie_id"]);
    show:boolean=false;
    start=1;

    public barChartOptions: any = {
        scaleShowVerticalLines: false,

        responsive: true
    };

    public barChartType: string = 'horizontalBar';

    public barChartLegend: boolean = true;


  constructor(private translate: TranslateService,
                private seoService: SeoApisService,
                public alertService: AlertService,
                private territoriosService: TerritoriosService) { }

  ngOnInit() {
  	this.recuperaNoColoniales('Territorios registrados');
  	this.recuperaCCAA();
  	this.recuperaTemporadas();
    this.recuperaTipos();
  	
  }

  recuperaNoColoniales(titulo){
    this.loading=true;
    this.show=false;
  	
  	console.log(this.chartData);
  	console.log(this.chartLabels);
  		this.chartData=[];
  		this.dataList=[];
  		this.chartLabels=[];

  		if (this.listaNoCol.length<=0){

  			this.chartData.push({data: this.dataList, label: titulo});

			  const clone = JSON.parse(JSON.stringify(this.chartData));
        	clone[0].data = this.dataList;
        	this.chartData = clone;



  			this.seoService.listaNoColoniales().subscribe(
              data => {
                this.listaNoCol=data;
                console.log(this.listaNoCol);

                for (let item of data){

                	this.getStatsEspecie(item["ID_ESP"],data.length);
                	this.chartLabels.push(item["DEN_ESP_CAS"]);
                }
              },
              error => {
                this.loading=false;
                  this.alertService.warning(this.translate.instant("Dashboard.errorGetNoCol"));
                  
            }
        );
  		}else{//Aqui nos ahorramos llamadas a seoService

  			this.chartData.push({data: this.dataList, label: titulo});

			    const clone = JSON.parse(JSON.stringify(this.chartData));
        	clone[0].data = this.dataList;
        	this.chartData = clone;

  			for (let item of this.listaNoCol){
                	this.getStatsEspecie(item["ID_ESP"], this.listaNoCol.length);
                	this.chartLabels.push(item["DEN_ESP_CAS"]);
                }

  		}
        
    }

    getStatsEspecie(especie, cantidad){


    	let busqueda='';

    	let ccaa=$( "#selectCCAA option:selected" ).attr("value");
    	let prov=$( "#selectProvincia option:selected" ).attr("value");
    	let temp=$( "#temporada option:selected" ).attr("value");
      let tipo=$( "#tipo option:selected" ).attr("value");

    	
    	ccaa!='all' ? busqueda=busqueda+'&ccaa='+ccaa : busqueda;
    	prov!='all' ? busqueda=busqueda+'&provincia='+prov : busqueda;
    	temp!='all' ? busqueda=busqueda+'&temporada='+temp : busqueda;
      tipo!='all' ? busqueda=busqueda+'&tipo='+tipo : busqueda;

    	console.log(busqueda);

    	this.territoriosService.getStats(especie, busqueda).subscribe(
              data => {
              	for (let item of data){
                    this.dataList.push(item["1"]);
                    if (this.start==cantidad){
                      this.show=true;
                      this.start=1;
                      this.loading=false;
                    }
                    this.start++;
                }
                
              },
              error => {
              	console.log(error);
                this.loading=false;
                  this.alertService.warning(this.translate.instant("Dashboard.errorGetNoCol"));
                  
            }
        );

    }


    recuperaCCAA(){
  	this.seoService.getCCAA().subscribe(
              data => {
                this.listaCCAA=data;
              },
              error => {
                  this.alertService.warning(this.translate.instant("Dashboard.errorGetCCAA"));
                  
            }
        );
  }

  recuperaProvincia(){
  	this.listaProv= [];
  	let id= $( "#selectCCAA option:selected" ).attr("id");
  	this.seoService.getProvincia(id).subscribe(
              data => {
                this.listaProv=data;
              },
              error => {
                  this.alertService.warning(this.translate.instant("Dashboard.errorGetProv"));
                  
            }
        );

  }

  recuperaTemporadas(){
    this.territoriosService.getTemporadas().subscribe(
      data=>{
        
        for (let item of data){
          
            this.listaTemporadas.push(item["anno"]);
          
        }
      },
      error=>{
        console.log(error);
      })
  }

  recuperaTipos(){
    this.territoriosService.getTiposTerritorio().subscribe(
      data=>{
      
        this.listaTipos=data["hydra:member"];
      },
      error=>{
        console.log(error);
      })
  }
}
