import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ApiProvider} from "../providers/api/api-provider";
import {environment} from "../environments/environment";
import {Colonia} from '../models/colonia';
import {VisitaColonia} from '../models/visita-colonia';
import {LocNidos} from '../models/loc-nidos';
import {EventEmitter} from '@angular/core';

@Injectable()
export class ColoniasService {

private url: string = environment.backendUrl;
public coloniaSelectedEvent: EventEmitter<any> = new EventEmitter();


  constructor(private api: ApiProvider, private http: HttpClient) {
  }


  //Registra una nueva colonia
  nuevaColonia(colonia: Colonia) {
    let config = {headers: new HttpHeaders().set("Content-Type", 'application/json')};

    let response=this.http.post(this.url + '/api/colonias', JSON.stringify(colonia), config);
    return response;
  }

//Recupera las colonias cercanas a la posicion del usuario, con un radio de distancia
  recuperaColoniasCercanas( radio, lat, lon, especie) {
    return this.http.get<any>(this.url + '/api/closeCol?rad=' + radio + '&lat=' + lat + '&lon=' + lon + '&especie=' + especie);
  }

  //recupera todas las colonias con paginacion

  recuperaColonias( page:number, especie:number) {
    return this.http.get<any>(this.url + '/api/colonias?page=' + page + '&especie=' + especie);
  }

//Recupera las colonias marcadas como favoritas por el usuario
  recuperaFavoritos( userId:number) {
    return this.http.get<any>(this.url + '/api/colonias/favoritos/' + userId);
  }

 //Marca una nueva colonia como favorita
  nuevoFavorito( data) {
    let config = {headers: new HttpHeaders().set("Content-Type", 'application/json')};

    let response=this.http.post(this.url + '/api/colonias/favoritos', JSON.stringify(data), config);
    return response;
  
  }

  //Desmarcamos un favorito
  removeFavorito(colId:number, usuario) {
    return this.api.delete('api/colonias/favoritos/' + colId + '?usuario=' + usuario);
  }


//Recuperamos colonias con un string de busqueda que incluye filtros
  recuperaColoniasFiltered( page:number, busqueda:string) {
    return this.http.get<any>(this.url + '/api/colonias?page=' + page + busqueda);
  }

  //Recupera los datos de una sola colonia

  recuperaColonia( colId:number) {

    return this.http.get<Colonia>(this.url + '/api/colonias/'+colId);
  }

//Modificamos los datos de una colonia existente
  modificarColonia(colId:number, data:any) {
    console.log(data);
    let config = {headers: new HttpHeaders().set("Content-Type", 'application/json')};
    return this.api.put('api/putColonia/' + colId, JSON.stringify(data), config);
  }

//Completamos los datos de la colonia con datos de nidos 
  completaColoniaNidos(locNidos: LocNidos, colId: number){

    let config = {headers: new HttpHeaders().set("Content-Type", 'application/json')};

    let response=this.http.post(this.url + '/api/colonias/' + colId+ '/loc-nidos', JSON.stringify(locNidos), config);
    return response;

  }

//Completamos los datos de la colonia por si hay otras especies en la misma colonia
  completaColoniaEspecies(data:any, colId: number){


    let config = {headers: new HttpHeaders().set("Content-Type", 'application/json')};

    let response=this.http.post(this.url + '/api/colonias/' + colId+ '/otras-especies', JSON.stringify(data), config);
    return response;

  }

//Recupera las visitas para una colonia
  recuperaVisitasGeneral( stringBusqueda:any) {
    return this.http.get<any>(this.url + '/api/visitas-colonias'+stringBusqueda);
  }


//Recupera mis visitas
  recuperaMisVisitas( stringBusqueda:any) {
    return this.http.get<any>(this.url + '/api/misVisitas'+stringBusqueda);
  }
//Registramos una nueva visita en una colonia
  nuevaVisitaColonia(data:any, colId: number){


    let config = {headers: new HttpHeaders().set("Content-Type", 'application/json')};

    let response=this.http.post(this.url + '/api/colonias/' + colId+ '/visitas', JSON.stringify(data), config);
    return response;

  }

//Editamos los datos de una visita ya creada
  modificarVisita(visitaId:number, visita) {
    let config = {headers: new HttpHeaders().set("Content-Type", 'application/json')};
    return this.api.put('api/visitas-colonias/' + visitaId, JSON.stringify(visita), config);
  }

//Eliminamos una visita que hemos creado
  eliminarVisita(visitaId:number) {
    return this.api.delete('api/visitas-colonias/' + visitaId);
  }

//Obtenemos datos para el dashboard

  getDashboardData(anno){
    return this.http.get<any>(this.url + '/api/dashboardData?anno=' + anno);
  }


//Obtenemos las estadisticas por año

  getStatsAnno(especie, busqueda){
    return this.http.get<any>(this.url + '/api/especies/'+especie+'/statsAnno' + busqueda);
  }

  //Obtenemos las estadisticas por ccaa

  getStatsCcaa(especie, busqueda){
    return this.http.get<any>(this.url + '/api/especies/'+especie+'/statsCcaa' + busqueda);
  }

  //Obtenemos las estadisticas por provincia

  getStatsProvincia(especie, busqueda){
    return this.http.get<any>(this.url + '/api/especies/'+especie+'/statsProvincia' + busqueda );
  }

//Obtenemos las temporadas

  getTemporadas(){
    return this.http.get<any>(this.url + '/api/temporadas');
  }

//Obtenemos estadisticas generales, una llamada por especie

  getStats(especie, busqueda){
    return this.http.get<any>(this.url + '/api/especies/stats?especie='+especie + busqueda);
  }

  //Operación para dejar seleccionada una especie en memoria

  selectColonia(data) {
    localStorage.setItem('especie', JSON.stringify(data));
    localStorage.setItem('especieTipo', 'colonia');
    this.coloniaSelectedEvent.emit(data);  
     return data;
  }



  //Obtenemos las estadisticas por año para numero de nidos

  getStatsAnnoCol(especie, busqueda){
    return this.http.get<any>(this.url + '/api/especies/'+especie+'/statsAnnoCol'+busqueda);
  }

  //Obtenemos las estadisticas por ccaa para numero de nidos

  getStatsCcaaCol(especie, busqueda){
    return this.http.get<any>(this.url + '/api/especies/'+especie+'/statsCcaaCol' + busqueda);
  }

  //Obtenemos las estadisticas por provincia para numero de nidos

  getStatsProvinciaCol(especie, busqueda){
    return this.http.get<any>(this.url + '/api/especies/'+especie+'/statsProvinciaCol' + busqueda);
  }

  //Obtenemos las estadisticas por municipio para numero de nidos

  getStatsMunicipioCol(especie, busqueda){
    return this.http.get<any>(this.url + '/api/especies/'+especie+'/statsMunicipioCol' + busqueda);
  }


//Obtenemos las estadisticas por tipo de edificio para numero de nidos

  getStatsTipoEdificioCol(especie, busqueda){
    return this.http.get<any>(this.url + '/api/especies/'+especie+'/statsTipoEdificioCol' + busqueda);
  }
  
  getStatsTipoPropiedadCol(especie, busqueda){
    return this.http.get<any>(this.url + '/api/especies/'+especie+'/statsTipoPropiedadCol' + busqueda);
  }


//Buscamos un censo de municipio
  getCensoMunicipio(especie, municipio, temporada){
    return this.http.get<any>(this.url + '/api/censo-municipios?especie='+especie+'&municipio=' + municipio + '&temporada='+temporada);
  }

  //Registramos un nuevo censo en un municipio
  nuevoCensoMunicipio(data:any){


    let config = {headers: new HttpHeaders().set("Content-Type", 'application/json')};

    let response=this.http.post(this.url + '/api/censo-municipios', JSON.stringify(data), config);
    return response;

  }
  //Modificamos los datos de un censo
  modificarCenso(censoId:number, data:any) {
    let config = {headers: new HttpHeaders().set("Content-Type", 'application/json')};
    return this.api.put('api/censo-municipios/' + censoId, JSON.stringify(data), config);
  }


  //Subimos una imagen

  uploadImage(id:number,images: File[]){
    let formData: FormData = new FormData();
    for (let image of images){
       formData.append('file[]', image, id+'_image'+new Date().getTime());
    }
   
    return this.api.post('api/visitas-colonias/'+id+'/image', formData);
  }


//Recuperamos documentos
  recuperaDocs( ) {
    return this.http.get<any>(this.url + '/api/docs/colonias');
  }





}
