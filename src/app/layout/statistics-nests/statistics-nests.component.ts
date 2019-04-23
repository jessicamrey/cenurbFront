import { Component, OnInit } from '@angular/core';
import { ColoniasService } from '../../../services/colonias.service';
import { TranslateService } from '@ngx-translate/core';
import { AlertService } from 'ngx-alerts';
import { SeoApisService } from '../../../services/seo-apis.service';

declare var $:any;
@Component({
  selector: 'app-statistics-nests',
  templateUrl: './statistics-nests.component.html',
  styleUrls: ['./statistics-nests.component.scss']
})
export class StatisticsNestsComponent implements OnInit {
	loading=false;
	annoChartData:any=[];
	annoChartLabels:string[]=[];
	ccaaChartData:any=[];
	ccaaChartLabels:string[]=[];
	provChartData:any=[];
	provChartLabels:string[]=[];

	listaCCAA:any=[];
	listaProv:any=[];
	listaMun:any=[];
  	listaTipoEd:any[]= [];
  	listaTemporadas:any=[];

	munData:any=[];
	tipoEdData:any=[];


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

  	this.recuperaCCAA();
  	this.recuperaTipoEd();
  	this.recuperaTemporadas();

  }

  recuperaTipoEd(){
  	this.seoService.getTipoEd().subscribe(
              data => {
                this.listaTipoEd=data["hydra:member"];
              }
        );
  }



   recuperaTemporadas(){
    this.coloniasService.getTemporadas().subscribe(
      data=>{
        
        for (let item of data){
          if (item["abierta"]==true){
            this.listaTemporadas.push(item["anno"]);
          }
        }
        console.log(this.listaTemporadas);
      },
      error=>{
        console.log(error);
      })
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
  	this.listaMun= [];
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

  recuperaMunicipio(){
  	let id= $( "#selectProvincia option:selected" ).attr("id");
  	this.seoService.getMunicipio(id).subscribe(
              data => {
                this.listaMun=data;
              },
              error => {
                  this.alertService.warning(this.translate.instant("Dashboard.errorGetMun"));
                  
            }
        );

  }




// RECUPERAMOS DATOS DE ESTADISTICAS, NO TODAS SE ASOCIARAN CON UN GRAFICO  


  statsAnno(){
  	this.coloniasService.getStatsAnnoCol(this.especie, 2019).subscribe(
  		data=>{
  			console.log("DATA ANO");
  			console.log(data);
  		},
  		error=>{
  			console.log(error);
  		});

  }
  
  statsCcaa(){
  	this.coloniasService.getStatsCcaaCol(this.especie, 2019).subscribe(
  		data=>{
  			console.log("DATA CCAA");
  			console.log(data);
  		},
  		error=>{
  			console.log(error);
  		});

  }

  statsProvincia(){
  	let ccaa=$( "#selectCCAA option:selected" ).attr("value");
  	this.coloniasService.getStatsProvinciaCol(this.especie, 2019, ccaa).subscribe(
  		data=>{
  			console.log("DATA PROVINCIA");
  			console.log(data);
  		},
  		error=>{
  			console.log(error);
  		});

  }

  statsMunicipio(){
  	let ccaa=$( "#selectCCAA option:selected" ).attr("value");
  	let prov=$( "#selectProvincia option:selected" ).attr("value");
  	let busqueda='';
  	let mun=$( "#selectMunicipio option:selected" ).attr("value");

  	mun != undefined ?  busqueda='&municipio='+mun :  busqueda;

  	this.coloniasService.getStatsMunicipioCol(this.especie, 2019, ccaa, prov, busqueda).subscribe(
  		data=>{
  			console.log("DATA MUNICIPIO");
  			console.log(data);
  		},
  		error=>{
  			console.log(error);
  		});

  }


  statsTipoEdificio(){


  	let busqueda='';

    let ccaa=$( "#selectCCAA option:selected" ).attr("value");
    let prov=$( "#selectProvincia option:selected" ).attr("value");
    let temp=$( "#temporada option:selected" ).attr("value");
  	let mun=$( "#selectMunicipio option:selected" ).attr("value");

    	
    ccaa!='all' ? busqueda=busqueda+'&ccaa='+ccaa : busqueda;
    prov!='all' ? busqueda=busqueda+'&provincia='+prov : busqueda;
    temp!='all' ? busqueda=busqueda+'&temporada='+temp : busqueda;
    mun!='all' ? busqueda=busqueda+'&municpio='+mun : busqueda;

    console.log(busqueda);

    this.coloniasService.getStatsTipoEdificioCol(this.especie, busqueda).subscribe(
  		data=>{
  			console.log("DATA TIPO EDIFICIO");
  			console.log(data);
  		},
  		error=>{
  			console.log(error);
  		});

  }




}
