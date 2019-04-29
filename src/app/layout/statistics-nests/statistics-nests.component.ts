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
  annoData:any=[];

	ccaaChartData:any=[];
	provChartData:any=[];
  munChartData:any=[];
  ccaaChartDataFiltered:any=[];
  provChartDataFiltered:any=[];
  munChartDataFiltered:any=[];

	listaCCAA:any=[];
	listaProv:any=[];
	listaMun:any=[];
  listaTipoEd:any[]= [];
  listaTemporadas:any=[];


  especie=parseInt(JSON.parse(localStorage.getItem('especie'))["especie_id"]);
  especieNombre=JSON.parse(localStorage.getItem('especie'))["especie"];


	// bar chart
    public barChartOptions: any = {
        scaleShowVerticalLines: false,
        responsive: true
    };
    public barChartTypeH: string = 'horizontalBar';
    public barChartType: string = 'bar';
    public barChartLegend: boolean = true;
    labels:string[]=["Num. nidos", "Num. nidos ocupados", "Num. nidos vacios", "Num. nidos exito"];

    show:boolean=false;
    showCcaa:boolean=false;
    showProv:boolean=false;
    showMun:boolean=false;

    disableProv:boolean=true;
    disableMun:boolean=true;

    ccaaFiltered:boolean=false;
    ccaaSelected:any;
    provFiltered:boolean=false;
    provSelected:any;
    munFiltered:boolean=false;
    munSelected:any;

    start=1;
    startMun=1;


  constructor(private translate: TranslateService,
                private coloniasService: ColoniasService,
                public alertService: AlertService,
                private seoService: SeoApisService) { }

  ngOnInit() {

  	this.recuperaCCAA();
  	this.recuperaTipoEd();
  	this.recuperaTemporadas();
    this.statsAnno('');
    this.statsCcaa('all');


    /*this.labels=[this.translate.instant("ViewVisits.numNest"),
                 this.translate.instant("ViewVisits.numTaken"),
                 this.translate.instant("ViewVisits.numEmpty"),
                 this.translate.instant("ViewVisits.numSuccess")]*/

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
            this.listaTemporadas.push(item["anno"]);
        }
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


// RECUPERAMOS DATOS DE ESTADISTICAS

//Cuando recuperamos datos de todos los municipios no les asociamos graficos, solo llevara grafico cuando se seleccione un municipio en concreto,
//Como son muchos municipios, poner un grafico para cada uno sin filtrar hara los datos ilegibles, mejor usar una tabla



  statsAnno(busqueda){
    this.show=false;
    this.loading=true;
  	this.coloniasService.getStatsAnnoCol(this.especie, '').subscribe(
  		data=>{
        this.annoData=data;
        for (let item of data){
          let dataList={data: [item[1], item[2], item[3], item[4]], label: this.especieNombre};
          this.annoChartData[item["anno"]]=[dataList];

                    if (this.start==data.length){
                      this.show=true;
                      this.start=1;
                      this.loading=false;
                    }
                    this.start++;
        }

  		},
  		error=>{
        this.loading=false;
  			console.log(error);
  		});

  }
  
  statsCcaa(ccaa){
    this.showCcaa=false;
    this.loading=true;
    if(ccaa=='all'){
      this.ccaaFiltered=false;
      this.coloniasService.getStatsCcaaCol(this.especie, '').subscribe(
      data=>{
        for (let item of data){
          let dataList={data: [item[1], item[2], item[3], item[4]], label: this.especieNombre};
          this.ccaaChartData[item["ccaa"]]=[dataList];

                    if (this.start==data.length){
                      this.showCcaa=true;
                      this.start=1;
                      this.loading=false;
                    }
                    this.start++;
        }
      },
      error=>{
        this.loading=false;
        console.log(error);
      });
    }else{
      this.ccaaChartDataFiltered=[this.ccaaChartData[ccaa]];
      this.ccaaFiltered=true;
    }
  	

  }

  statsProvincia(busqueda, prov){
    this.showProv=false;
    this.loading=true;
    if(prov=='all'){
      this.provFiltered=false;
    	this.coloniasService.getStatsProvinciaCol(this.especie, busqueda).subscribe(
    		data=>{
          for (let item of data){
            let dataList={data: [item[1], item[2], item[3], item[4]], label: this.especieNombre};
            this.provChartData[item["provincia"]]=[dataList];

                      if (this.start==data.length){
                        this.showProv=true;
                        this.start=1;
                        this.loading=false;
                      }
                      this.start++;
          }
    		},
    		error=>{
          this.loading=false;
    			console.log(error);
    		});
    }else{

      this.provChartDataFiltered=[this.provChartData[prov]];
      this.provFiltered=true;
    }

  }

  statsMunicipio(busqueda, mun){
    this.showMun=false;
    this.loading=true;

    if(mun=='all'){
      this.munFiltered=false;
    	this.coloniasService.getStatsMunicipioCol(this.especie, busqueda).subscribe(
    		data=>{


          for (let item of data){
            let dataList={data: [item[1], item[2], item[3], item[4]], label: this.especieNombre};
            this.munChartData[item["municipio"]]=[dataList];

                      if (this.startMun==data.length){
                        this.showMun=true;
                        this.startMun=1;
                        this.loading=false;
                      }
                      this.startMun++;
          }


    		},
    		error=>{
          this.loading=false;
    			console.log(error);
    		});
    }else{
      this.munChartDataFiltered=[this.munChartData[mun]];
      this.munFiltered=true;
    }

  }


  statsTipoEdificio(busqueda){

    this.coloniasService.getStatsTipoEdificioCol(this.especie, busqueda).subscribe(
  		data=>{
  			console.log("DATA TIPO EDIFICIO");
  			console.log(data);
  		},
  		error=>{
  			console.log(error);
  		});

  }

  filtrar(){

    //reseteamos las listas de datos
    this.show=false;
    this.showCcaa=false;
    this.start=1;
    let busqueda='?';

    let ccaa=$( "#selectCCAA option:selected" ).attr("value");
    let prov=$( "#selectProvincia option:selected" ).attr("value");
    let temp=$( "#temporada option:selected" ).attr("value");
    let mun=$( "#selectMunicipio option:selected" ).attr("value");
    let tipoEd=$( "#tipoEdificio option:selected" ).attr("value");

    this.ccaaSelected=ccaa;
    this.provSelected=prov;
    this.munSelected=mun;

    ccaa!='all' ? busqueda=busqueda+'&ccaa='+ccaa : busqueda;
    prov!='all' ? busqueda=busqueda+'&provincia='+prov : busqueda;
    temp!='all' ? busqueda=busqueda+'&temporada='+temp : busqueda;
    mun!='all'&&mun!=undefined ? busqueda=busqueda+'&municipio='+mun : busqueda;
    tipoEd!='all' ? busqueda=busqueda+'&tipoEdificio='+tipoEd : busqueda;

    console.log(busqueda);

    this.statsAnno(busqueda);
    this.statsCcaa(ccaa);
    //this.statsTipoEdificio(busqueda);

    if (ccaa!='all'){
      this.disableProv=false;
      this.statsProvincia(busqueda, prov);
    }else{
      this.disableProv=true;

    }

    if(prov!='all'){
      this.disableMun=false;
      this.statsMunicipio(busqueda, mun);
    }else{
      this.disableMun=true;
    }



  }




}
