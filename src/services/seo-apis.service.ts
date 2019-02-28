import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ApiProvider} from "../providers/api/api-provider";
import {environment} from "../environments/environment";


@Injectable()
export class SeoApisService {

private url: string = environment.backendUrl;


  constructor(private api: ApiProvider, private http: HttpClient) {
  }

//Obtiene una lista con todas las aves coloniales y sus imágenes de perfil
  listaColoniales( ) {
    return this.http.get<any>(this.url + '/api/listCol');
  }
//Obtiene una lista con todas las aves no coloniales y sus imágenes de perfil

  listaNoColoniales( ) {
    return this.http.get<any>(this.url + '/api/listNoCol');
  }
//Recupera el listado de Comunidades autónomas de la base de datos de SEO
  getCCAA( ) {
    return this.http.get<any>(this.url + '/api/ccaa');
  }

//Recupera un listado de provincias de una comunidad autónoma de la base de datos de SeO
  getProvincia(idCom:any ) {
    return this.http.get<any>(this.url + '/api/provincias/' + idCom);
  }

//Recupera los municipios de una provincia de la base de datos de SEO
  getMunicipio(idProv:any ) {
    return this.http.get<any>(this.url + '/api/municipios/' + idProv);
  }
//Recupera todos los tipos de propiedades
  getTipoProp() {
    return this.http.get<any>(this.url + '/api/tipo-propiedads');
  }
//Recupera todos los tipos de edificios
  getTipoEd( ) {
    return this.http.get<any>(this.url + '/api/tipo-edificios');
  }  

}