import { Component, OnInit } from '@angular/core';
import { TerritoriosService } from '../../../services/territorios.service';
import { TranslateService } from '@ngx-translate/core';
import { AlertService } from 'ngx-alerts';
import { SeoApisService } from '../../../services/seo-apis.service';

declare var $:any;

@Component({
  selector: 'app-statistics-terr',
  templateUrl: './statistics-terr.component.html',
  styleUrls: ['./statistics-terr.component.scss']
})
export class StatisticsTerrComponent implements OnInit {

  loading=false;
  annoChartData:any=[];
  annoData:any=[];

  ccaaChartData:any=[];
  provChartData:any=[];

  annoChartDataFiltered:any=[];
  ccaaChartDataFiltered:any=[];
  provChartDataFiltered:any=[];
  provDataFiltered:any=[];


  listaCCAA:any=[];
  listaProv:any=[];
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

    annoFiltered:boolean=false;
    annoSelected:any;
    ccaaFiltered:boolean=false;
    ccaaSelected:any;
    provFiltered:boolean=false;
    provSelected:any;

    ccaaChartLabels:string[]=[];
    provChartLabels:string[]=[];
    provChartLabelsFiltered:string[]=[];


    start=1;
    dataList:any=[];
    dataListProv:any=[];

  constructor(private translate: TranslateService,
                private territoriosService: TerritoriosService,
                public alertService: AlertService,
                private seoService: SeoApisService) { }

    ngOnInit() {
    this.recuperaCCAA();
    this.recuperaProvincias();
    this.recuperaTemporadas();
    this.statsProvincia('','all', 'all');
    this.statsAnno('','all');
    this.statsCcaa('','all');

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

   recuperaCCAA(){
    this.seoService.getCCAA().subscribe(
              data => {
                this.listaCCAA=data;
                for (let ccaa of data){
                  this.ccaaChartLabels.push(ccaa["DEN_COM"]);
                  this.dataList.push("0");
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

recuperaProvincias(){
    this.listaProv= [];
    this.seoService.getProvincias().subscribe(
              data => {
                this.listaProv=data;
                for (let prov of data){
                  this.provChartLabels.push(prov["DEN_PROV"]);
                  this.dataListProv.push("0");
                }
                this.provChartData=[{data: this.dataListProv, label: this.especieNombre}];
              },
              error => {
                  this.alertService.warning(this.translate.instant("Dashboard.errorGetProv"));
                  
            }
        );
}

statsAnno(busqueda, anno){
    this.loading=true;
    if(anno=='all'){
      this.annoFiltered=false;
      this.territoriosService.getStatsAnno(this.especie, busqueda).subscribe(
        data=>{
          for (let item of data){
            let dataList={data: [item["1"], item["anno"]], label: this.especieNombre};
            this.annoChartData[item["anno"]]=[dataList];

                      if (this.start==data.length){
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
      this.loading=false;
    }
  

  }




  statsCcaa(busqueda,ccaa){



    this.loading=true;
    

      for (let index in this.dataList){
        this.dataList[index]="0";
      }


      this.ccaaFiltered=false;
      this.territoriosService.getStatsCcaa(this.especie, busqueda).subscribe(
      data=>{
        console.log(data);
        if (data.length>0){


          for (let item of data){

            this.dataList[this.ccaaChartLabels.indexOf(item["ccaa"])]=item["1"];
            
          }

          this.ccaaChartData=[{data: this.dataList, label: this.especieNombre}];
        }
        else{ //sin datos
          this.ccaaChartData=[{data: [], label: this.especieNombre}];
          this.loading=false;

        }

         if(ccaa!='all'){
    
           // this.ccaaChartDataFiltered=[this.ccaaChartData['0'].data[this.ccaaChartLabels.indexOf(ccaa)]];
           if (data.length>0){
             this.ccaaChartDataFiltered=[data["0"]["1"]];
           }else{
             this.ccaaChartDataFiltered=["0"];
           }
            
            this.ccaaFiltered=true;
            this.loading=false;
          }


      },
      error=>{
        this.loading=false;
        console.log(error);
      });
   
    
    

  }

  statsProvincia(busqueda, prov, ccaa){
    this.loading=true;
    let dataListFiltered:any=[];
   
          console.log("caso2");
            for (let index in this.dataListProv){
              this.dataListProv[index]="0";
            }
            this.provFiltered=false;
            this.territoriosService.getStatsProvincia(this.especie, busqueda).subscribe(
            data=>{

              if (data.length>0){


                for (let item of data){

                  this.dataListProv[this.provChartLabels.indexOf(item["provincia"])]=item["1"];
                  
                }

                this.provChartData=[{data: this.dataListProv, label: this.especieNombre}];
              }
              else{ //sin datos
                this.provChartData=[{data: [], label: this.especieNombre}];
                this.loading=false;

              }

              if (prov!='all'){
                console.log("caso 3");

                //Este es el caso en el que queremos filtrar una unica provincia

                //this.provDataFiltered=[this.provChartData['0'].data[this.provChartLabels.indexOf(prov)]];
                 if (data.length>0){
                  this.provDataFiltered=[data["0"]["1"]];
                }else{
                  this.provDataFiltered=["0"];

                }
                this.provFiltered=true;
              
               this.loading=false;
              }else{
                if (ccaa!='all'){
                  console.log("caso 1");
                  //Este es el caso en el que queremos ver varias provincias por ccaa
                  this.provChartLabelsFiltered=[];
                  for (let provincia of this.listaProv){
                      this.provDataFiltered[provincia["ID_PROV"]]=(this.provChartData['0'].data[this.provChartLabels.indexOf(provincia["DEN_PROV"])]);
                      this.provChartLabelsFiltered.push(provincia["DEN_PROV"]);
                      dataListFiltered.push(this.provChartData['0'].data[this.provChartLabels.indexOf(provincia["DEN_PROV"])]);
                  }
                  this.provFiltered=false;
                  this.provSelected=ccaa;
                  this.provChartDataFiltered=[{data: dataListFiltered, label: this.especieNombre}];
                }

              }

              

            },
            error=>{
              this.loading=false;
              console.log(error);
            });

        
     

    
  }



  filtrar(){



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
    this.statsProvincia(busqueda, prov, ccaa);
    
    this.loading=false;

    



  }


}
