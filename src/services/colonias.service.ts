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

//Recuperamos colonias con un string de busqueda que incluye filtros
  recuperaColoniasFiltered( page:number, busqueda:string) {
    return this.http.get<any>(this.url + '/api/colonias?page=' + page + busqueda);
  }

  //Recupera los datos de una sola colonia

  recuperaColonia( colId:number) {

    return this.http.get<Colonia>(this.url + '/api/colonias/'+colId);
  }

//Modificamos los datos de una colonia existente
  modificarColonia(colId:number, colonia: Colonia) {
    let config = {headers: new HttpHeaders().set("Content-Type", 'application/json')};
    return this.api.put('api/colonias/' + colId, JSON.stringify(colonia), config);
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
//Recuperamos las visitas de un solo usuario
  recuperaVisitas( userId:any, stringBusqueda:any) {
    return this.http.get<any>(this.url + '/api/usuario/' + userId + '/visitas'+stringBusqueda);
  }

//Recupera las visitas para una colonia
  recuperaVisitasGeneral( stringBusqueda:any) {
    return this.http.get<any>(this.url + '/api/visitas-colonias'+stringBusqueda);
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

//Obtenemos las estadisticas por año

  getStatsAnno(especie, temp){
    return this.http.get<any>(this.url + '/api/especies/'+especie+'/statsAnno?temporada=' + temp);
  }

  //Obtenemos las estadisticas por ccaa

  getStatsCcaa(especie, temp){
    return this.http.get<any>(this.url + '/api/especies/'+especie+'/statsCcaa?temporada=' + temp);
  }

  //Obtenemos las estadisticas por provincia

  getStatsProvincia(especie, temp, ccaa){
    return this.http.get<any>(this.url + '/api/especies/'+especie+'/statsProvincia?temporada=' + temp + '&ccaa=' + ccaa);
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
    this.coloniaSelectedEvent.emit(data);  
     return data;
  }



  //Obtenemos las estadisticas por año para numero de nidos

  getStatsAnnoCol(especie, temp){
    return this.http.get<any>(this.url + '/api/especies/'+especie+'/statsAnnoCol?temporada=' + temp);
  }

  //Obtenemos las estadisticas por ccaa para numero de nidos

  getStatsCcaaCol(especie, temp){
    return this.http.get<any>(this.url + '/api/especies/'+especie+'/statsCcaaCol?temporada=' + temp);
  }

  //Obtenemos las estadisticas por provincia para numero de nidos

  getStatsProvinciaCol(especie, temp, ccaa){
    return this.http.get<any>(this.url + '/api/especies/'+especie+'/statsProvinciaCol?temporada=' + temp + '&ccaa=' + ccaa);
  }

  //Obtenemos las estadisticas por municipio para numero de nidos

  getStatsMunicipioCol(especie, temp, ccaa, prov, busqueda){
    return this.http.get<any>(this.url + '/api/especies/'+especie+'/statsMunicipioCol?temporada=' + temp + '&ccaa=' + ccaa + '&provincia=' + prov + busqueda);
  }


//Obtenemos las estadisticas por tipo de edificio para numero de nidos


//COMPROBAR QUE EL STRING DE BUSQUED ESTE BIEN FORMADO,. NO SE SI LA FORMA ?& FUNCIONARA

  getStatsTipoEdificioCol(especie, busqueda){
    return this.http.get<any>(this.url + '/api/especies/'+especie+'/statsTipoEdificioCol?' + busqueda);
  }




}