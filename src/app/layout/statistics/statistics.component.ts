import { Component, OnInit } from '@angular/core';
import { ColoniasService } from '../../../services/colonias.service';
import { TranslateService } from '@ngx-translate/core';
import { AlertService } from 'ngx-alerts';
import { SeoApisService } from '../../../services/seo-apis.service';

declare var $:any;

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
	loading=false;
  annoChartData:any=[];
  annoData:any=[];

  ccaaChartData:any=[];
  provChartData:any=[];
  munChartData:any=[];
  tipoEdChartData:any=[];

  annoChartDataFiltered:any=[];
  ccaaChartDataFiltered:any=[];
  provChartDataFiltered:any=[];
  munChartDataFiltered:any=[];
  tipoEdChartDataFiltered:any=[];


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

    annoFiltered:boolean=false;
    annoSelected:any;
    ccaaFiltered:boolean=false;
    ccaaSelected:any;
    provFiltered:boolean=false;
    provSelected:any;

    ccaaChartLabels:string[]=[];
    provChartLabels:string[]=[];

    start=1;
    dataList:any=[];
    dataListProv:any=[];




  constructor(private translate: TranslateService,
                private coloniasService: ColoniasService,
                public alertService: AlertService,
                private seoService: SeoApisService) { }

  ngOnInit() {
    this.recuperaCCAA();
    this.recuperaTemporadas();
    this.statsAnno('','all');
    this.statsCcaa('','all');

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
                for (let ccaa of data){
                  this.ccaaChartLabels.push(ccaa["DEN_COM"]);
                  this.dataList.push("0");                  
                  this.statsProvincia(ccaa["ID_COM"], '', 'all');
                }
                this.ccaaChartData=[{data: this.dataList, label: this.especieNombre}];
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

statsAnno(busqueda, anno){
    this.show=false;
    this.loading=true;
    if(anno=='all'){
      this.annoFiltered=false;
      this.coloniasService.getStatsAnno(this.especie, busqueda).subscribe(
        data=>{
          for (let item of data){
            let dataList={data: [item["1"], item["anno"]], label: this.especieNombre};
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
    }else{

      this.annoChartDataFiltered=[this.annoChartData[anno]];
      this.annoFiltered=true;
    }
  

  }




  statsCcaa(busqueda,ccaa){
    this.showCcaa=false;
    this.loading=true;
    if(ccaa=='all'){
      this.ccaaFiltered=false;
      this.coloniasService.getStatsCcaa(this.especie, busqueda).subscribe(
      data=>{

        if (data.length>0){


          for (let item of data){

            this.dataList[this.ccaaChartLabels.indexOf(item["ccaa"])]=item["1"];
            
          }

          this.ccaaChartData=[{data: this.dataList, label: this.especieNombre}];
        }
        else{ //sin datos
          this.ccaaChartData=[];
          this.loading=false;

        }
      },
      error=>{
        this.loading=false;
        console.log(error);
      });
    }else{
      this.ccaaChartDataFiltered=[this.ccaaChartData['0'].data[this.ccaaChartLabels.indexOf(ccaa)]];
      this.ccaaFiltered=true;
    }
    

  }

  statsProvincia(idCom, busqueda, prov){
    console.log("Entramos en el id de comunidad: " + idCom);
    this.loading=true;
    if (prov=='all'){
      //Queremos recuperar todas las estadisticas al mismo tiempo, por lo que el primer paso es recuperar las provincias de la ccaa
      this.seoService.getProvincia(idCom).subscribe(
              data => {
                for (let provincia of data){
                  this.provChartLabels.push(provincia["DEN_PROV"]);
                  this.coloniasService.getStatsProvincia(this.especie,busqueda).subscribe(
                    dataProv=>{
                        if (dataProv.length>0){


                          for (let item of dataProv){

                            this.dataListProv[this.provChartLabels.indexOf(item["provincia"])]=item["1"];
                          }

                          this.provChartData=[{data: this.dataListProv, label: this.especieNombre}];
                        }
                        else{ //sin datos
                          this.provChartData=[];
                          this.loading=false;

                        }


                    },
                    errorProv=>{
                      this.loading=false;
                    });
                }
                console.log(this.provChartLabels);
                console.log(this.provChartData);
              },
              error => {
                  this.alertService.warning(this.translate.instant("Dashboard.errorGetProv"));
                  
            }
        );


    }else{

      this.provChartDataFiltered=[this.provChartData['0'].data[this.provChartLabels.indexOf(prov)]];
      this.ccaaFiltered=true;
    }

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

    this.ccaaSelected=ccaa;
    this.provSelected=prov;
    this.annoSelected=temp;



    ccaa!='all' ? busqueda=busqueda+'&ccaa='+ccaa : busqueda;
    prov!='all' ? busqueda=busqueda+'&provincia='+prov : busqueda;
    temp!='all' ? busqueda=busqueda+'&temporada='+temp : busqueda;
    console.log(busqueda);

    this.statsAnno(busqueda, temp);
    this.statsCcaa(busqueda,ccaa);

    /*if (ccaa!='all'){
      this.disableProv=false;
      this.statsProvincia(busqueda, prov);
    }else{
      this.disableProv=true;

    }*/

    



  }




  }
          






