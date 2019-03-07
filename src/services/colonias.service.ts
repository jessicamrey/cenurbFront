import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ApiProvider} from "../providers/api/api-provider";
import {environment} from "../environments/environment";
import {Colonia} from '../models/colonia';
import {LocNidos} from '../models/loc-nidos';


@Injectable()
export class ColoniasService {

private url: string = environment.backendUrl;


  constructor(private api: ApiProvider, private http: HttpClient) {
  }

  nuevaColonia(colonia: Colonia) {
    let config = {headers: new HttpHeaders().set("Content-Type", 'application/json')};

    let response=this.http.post(this.url + '/api/colonias', JSON.stringify(colonia), config);
    return response;
  }

  recuperaColonias( ) {
    return this.http.get<Colonia>(this.url + '/api/colonias');
  }

  recuperaColonia( colId:number) {

    return this.http.get<Colonia>(this.url + '/api/colonias/'+colId);
  }

  modificarColonia(colId:number, colonia: Colonia) {
    let config = {headers: new HttpHeaders().set("Content-Type", 'application/json')};
    return this.api.put('api/colonias/' + colId, JSON.stringify(colonia), config);
  }

  completaColoniaNidos(locNidos: LocNidos, colId: number){

    let config = {headers: new HttpHeaders().set("Content-Type", 'application/json')};

    let response=this.http.post(this.url + '/api/colonias/' + colId+ '/loc-nidos', JSON.stringify(locNidos), config);
    return response;

  }

  completaColoniaEspecies(data:any, colId: number){


    let config = {headers: new HttpHeaders().set("Content-Type", 'application/json')};

    let response=this.http.post(this.url + '/api/colonias/' + colId+ '/otras-especies', JSON.stringify(data), config);
    return response;

  }

}