import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ApiProvider} from "../providers/api/api-provider";
import {environment} from "../environments/environment";
import {EventEmitter} from '@angular/core';
import {Territorio} from '../models/territorio';
import {LocNidosTerr} from '../models/loc-nidos-terr';

@Injectable()
export class TerritoriosService {

private url: string = environment.backendUrl;
public territorioSelectedEvent: EventEmitter<any> = new EventEmitter();


  constructor(private api: ApiProvider, private http: HttpClient) {
  }

  //Operación para dejar seleccionada una especie en memoria

  selectTerritorio(data) {
    localStorage.setItem('especie', JSON.stringify(data));
    this.territorioSelectedEvent.emit(data);  
     return data;
  }


   //Registra un nuevo territorio
  nuevoTerritorio(territoio: Territorio) {
    let config = {headers: new HttpHeaders().set("Content-Type", 'application/json')};

    let response=this.http.post(this.url + '/api/territorios', JSON.stringify(territoio), config);
    return response;
  }

  //Completamos los datos del territorio con datos de nidos 
  completaTerritorioNidos(locNidos: LocNidosTerr, terrId: number){

    let config = {headers: new HttpHeaders().set("Content-Type", 'application/json')};

    let response=this.http.post(this.url + '/api/territorios/' + terrId+ '/loc-nidos', JSON.stringify(locNidos), config);
    return response;

  }

  //Obtenemos las temporadas

  getTemporadas(){
    return this.http.get<any>(this.url + '/api/temporadas');
  }

  //Obtenemos los tipos de territorio

  getTiposTerritorio(){
    return this.http.get<any>(this.url + '/api/tipo-territorios');
  }

  //Obtenemos los emplazamientos

  getEmplazamientos(){
    return this.http.get<any>(this.url + '/api/emplazamientos');
  }

   //Obtenemos los emplazamientos

  getObservaciones(){
    return this.http.get<any>(this.url + '/api/observaciones-territorios');
  }

  //Obtenemos los tipos de territorio

  getTipos(){
    return this.http.get<any>(this.url + '/api/tipo-territorios');
  }

   //recupera todos los territorios con paginacion

  recuperaTerritorios( page:number, especie:number) {
    return this.http.get<any>(this.url + '/api/territorios?page=' + page + '&especie=' + especie);
  }
//Recuperamos territorios con un string de busqueda que incluye filtros
  recuperaTerritoriosFiltered( page:number, busqueda:string) {
    return this.http.get<any>(this.url + '/api/territorios?page=' + page + busqueda);
  }

  //Recupera los datos de un solo territorio

  recuperaTerritorio( terrId:number) {

    return this.http.get<Territorio>(this.url + '/api/territorios/'+terrId);
  }


  //Recupera los territorios marcados como favoritos por el usuario
  recuperaFavoritos( userId:number) {
    return this.http.get<any>(this.url + '/api/territorios/favoritos/' + userId);
  }

 //Marca un nuevo territorio como favorito
  nuevoFavorito( data) {
    let config = {headers: new HttpHeaders().set("Content-Type", 'application/json')};

    let response=this.http.post(this.url + '/api/territorios/favoritos', JSON.stringify(data), config);
    return response;
  
  }


  //Recupera las visitas para un territorio
  recuperaVisitasGeneral( stringBusqueda:any) {
    return this.http.get<any>(this.url + '/api/visitas-territorios'+stringBusqueda);
  }


//Registramos una nueva visita en un territorio
  nuevaVisitaTerritorio(data:any, terrId: number){


    let config = {headers: new HttpHeaders().set("Content-Type", 'application/json')};

    let response=this.http.post(this.url + '/api/territorios/' + terrId+ '/visitas', JSON.stringify(data), config);
    return response;

  }


  //Editamos los datos de una visita ya creada
  modificarVisita(visitaId:number, visita) {
    let config = {headers: new HttpHeaders().set("Content-Type", 'application/json')};
    return this.api.put('api/visitas-territorios/' + visitaId, JSON.stringify(visita), config);
  }

//Eliminamos una visita que hemos creado
  eliminarVisita(visitaId:number) {
    return this.api.delete('api/visitas-territorios/' + visitaId);
  }

//Obtenemos las estadisticas por año

  getStatsAnno(especie, temp){
    return this.http.get<any>(this.url + '/api/especies/'+especie+'/statsAnnoTerr?temporada=' + temp);
  }

  //Obtenemos las estadisticas por ccaa

  getStatsCcaa(especie, temp){
    return this.http.get<any>(this.url + '/api/especies/'+especie+'/statsCcaaTerr?temporada=' + temp);
  }

  //Obtenemos las estadisticas por provincia

  getStatsProvincia(especie, temp, ccaa){
    return this.http.get<any>(this.url + '/api/especies/'+especie+'/statsProvinciaTerr?temporada=' + temp + '&ccaa=' + ccaa);
  }


  //Obtenemos estadisticas generales, una llamada por especie

  getStats(especie, busqueda){
    return this.http.get<any>(this.url + '/api/especies/statsTerr?especie='+especie + busqueda);
  }

  //Obtenemos estadisticas para observaciones

  getStatsObsv(especie, busqueda){
    return this.http.get<any>(this.url + '/api/especies/'+especie+ '/statsObservaciones'+ busqueda);
  }



}