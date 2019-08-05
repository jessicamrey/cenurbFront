import { Component, OnInit } from '@angular/core';
import { SeoApisService } from '../../../services/seo-apis.service';
import { TranslateService } from '@ngx-translate/core';
import { AlertService } from 'ngx-alerts';
import { ColoniasService } from '../../../services/colonias.service';
import { SharedServicesService } from '../../../services/shared-services.service';
import { AuthService } from '../../../services/auth.service';



declare var $:any;
@Component({
  selector: 'app-general-col',
  templateUrl: './general-col.component.html',
  styleUrls: ['./general-col.component.scss']
})
export class GeneralColComponent implements OnInit {

	listaCol:any[]= [];
  listaCCAA:any[]= [];
  listaProv:any[]= [];
  listaTemporadas:any[]= [];

	loading=false;
	chartData:any=[];
	dataList:any=[];
	chartLabels:string[]=[];
  especie=parseInt(JSON.parse(localStorage.getItem('especie'))["especie_id"]);
  show:boolean=false;
  start=1;
  mostrarDescargar:boolean=false;

    public barChartOptions: any = {
        scaleShowVerticalLines: false,

        responsive: true
    };

    public barChartType: string = 'horizontalBar';

    public barChartLegend: boolean = true;

  constructor(private translate: TranslateService,
                private seoService: SeoApisService,
                public alertService: AlertService,
                private coloniasService: ColoniasService,
                private sharedServices: SharedServicesService,
                private authService: AuthService) { }

  ngOnInit() {


  	this.recuperaColoniales('Colonias registradas');
  	this.recuperaCCAA();
  	this.recuperaTemporadas();
    this.isAdmin();


  }

  isAdmin(){
    this.authService.isAdmin().subscribe(
              data => {
                this.mostrarDescargar=data;
              },
              error => {
                  console.log(error);
                  
            }
        );
  }

  exportAsXLSX():void {

   //let dataToExport=JSON.parse(this.chartData[0]["data"]);
   let dataToExport:any=[];

   for (let position in this.listaCol){
     console.log(position);
     let element:any;

     if(this.translate.currentLang=='es'){
       element={
         Nombre: this.listaCol[position]["DEN_ESP_CAS"],
         Cantidad: this.chartData[0].data[position]
       }
     }
     if(this.translate.currentLang=='cat'){
        element={
         Nombre: this.listaCol[position]["DEN_ESP_CAT"],
         Cantidad: this.chartData[0].data[position]
       }
     }
     if(this.translate.currentLang=='eus'){
        element={
         Nombre: this.listaCol[position]["DEN_ESP_EUS"],
         Cantidad: this.chartData[0].data[position]
       }
     }
     if(this.translate.currentLang=='gal'){
        element={
         Nombre: this.listaCol[position]["DEN_ESP_GAL"],
         Cantidad: this.chartData[0].data[position]
       }
     }
     if(this.translate.currentLang=='en'){
        element={
         Nombre: this.listaCol[position]["DEN_ESP_ING"],
         Cantidad: this.chartData[0].data[position]
       }
     }
     
     dataToExport.push(element);

   }
   this.sharedServices.exportAsExcelFile(dataToExport, 'sample');

}


  recuperaColoniales(titulo){
   this.loading=true;
    this.show=false;
    
    console.log(this.chartData);
    console.log(this.chartLabels);
      this.chartData=[];
      this.dataList=[];
      this.chartLabels=[];

      //if (this.listaNoCol.length<=0){

        this.chartData=[{data: this.dataList, label: titulo}];

        /*const clone = JSON.parse(JSON.stringify(this.chartData));
          clone[0].data = this.dataList;
          this.chartData = clone;*/



        this.seoService.listaColoniales().subscribe(
              data => {
                this.listaCol=data;
                console.log(this.listaCol);

                for (let item of data){
                  if(this.translate.currentLang=='es'){
                    this.getStatsEspecie(item["ID_ESP"],data.length, '');
                    this.chartLabels.push(item["DEN_ESP_CAS"]);
                  }
                  if(this.translate.currentLang=='eus'){
                    this.getStatsEspecie(item["ID_ESP"],data.length, '');
                    this.chartLabels.push(item["DEN_ESP_VAS"]);
                  }
                  if(this.translate.currentLang=='gal'){
                    this.getStatsEspecie(item["ID_ESP"],data.length, '');
                    this.chartLabels.push(item["DEN_ESP_GAL"]);
                  }
                  if(this.translate.currentLang=='cat'){
                    this.getStatsEspecie(item["ID_ESP"],data.length, '');
                    this.chartLabels.push(item["DEN_ESP_CAT"]);
                  }
                  if(this.translate.currentLang=='en'){
                    this.getStatsEspecie(item["ID_ESP"],data.length, '');
                    this.chartLabels.push(item["DEN_ESP_ING"]);
                  }
                }
              },
              error => {
                this.loading=false;
                  this.alertService.warning(this.translate.instant("Dashboard.errorGetNoCol"));
                  
            }
        );
      //}
      /*else{//Aqui nos ahorramos llamadas a seoService

        this.chartData.push({data: this.dataList, label: titulo});

          const clone = JSON.parse(JSON.stringify(this.chartData));
          clone[0].data = this.dataList;
          this.chartData = clone;

        for (let item of this.listaNoCol){
                  this.getStatsEspecie(item["ID_ESP"], this.listaNoCol.length);
                  this.chartLabels.push(item["DEN_ESP_CAS"]);
                }

      }*/
        
    }

    getStatsEspecie(especie, cantidad, busqueda){


      this.coloniasService.getStats(especie, busqueda).subscribe(
              data => {
               

                for (let item of data){
                    this.dataList.push(item["1"]);
                     this.chartData=[{data: this.dataList, label: 'Territorios registrados'}];
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

   filtrar(){
      this.show=false;
      this.loading=true;
      this.dataList=[];
      this.chartLabels=[];
      let busqueda='';

      let ccaa=$( "#selectCCAA option:selected" ).attr("value");
      let prov=$( "#selectProvincia option:selected" ).attr("value");
      let temp=$( "#temporada option:selected" ).attr("value");


      
      ccaa!='all' ? busqueda=busqueda+'&ccaa='+ccaa : busqueda;
      prov!='all' ? busqueda=busqueda+'&provincia='+prov : busqueda;
      temp!='all' ? busqueda=busqueda+'&temporada='+temp : busqueda;


      console.log(busqueda);

      /*for (let especie of this.listaNoCol){
        this.getStatsEspecie(especie["ID_ESP"], this.listaNoCol.length, busqueda);
      }*/

      this.seoService.listaColoniales().subscribe(
              data => {
                this.listaCol=data;
                console.log(this.listaCol);

                for (let item of data){

                   if(this.translate.currentLang=='es'){
                    this.getStatsEspecie(item["ID_ESP"],data.length, busqueda);
                    this.chartLabels.push(item["DEN_ESP_CAS"]);
                  }

                  if(this.translate.currentLang=='eus'){
                    this.getStatsEspecie(item["ID_ESP"],data.length, busqueda);
                    this.chartLabels.push(item["DEN_ESP_VAS"]);
                  }

                  if(this.translate.currentLang=='gal'){
                    this.getStatsEspecie(item["ID_ESP"],data.length, busqueda);
                    this.chartLabels.push(item["DEN_ESP_GAL"]);
                  }

                  if(this.translate.currentLang=='cat'){
                    this.getStatsEspecie(item["ID_ESP"],data.length, busqueda);
                    this.chartLabels.push(item["DEN_ESP_CAT"]);
                  }

                  if(this.translate.currentLang=='en'){
                    this.getStatsEspecie(item["ID_ESP"],data.length, busqueda);
                    this.chartLabels.push(item["DEN_ESP_ING"]);
                  }
                }
              },
              error => {
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
    this.coloniasService.getTemporadas().subscribe(
      data=>{
        
        for (let item of data["hydra:member"]){
          
            this.listaTemporadas.push(item["anno"]);
          
        }
      },
      error=>{
        console.log(error);
      })
  }

}
