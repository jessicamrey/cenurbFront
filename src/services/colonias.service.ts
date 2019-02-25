import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ApiProvider} from "../providers/api/api-provider";
import {environment} from "../environments/environment";
import {Colonia} from '../models/colonia';

@Injectable()
export class ColoniasService {

private url: string = environment.backendUrl;


  constructor(private api: ApiProvider, private http: HttpClient) {
  }

  nuevaColonia(colonia: Colonia) {
    let config = {headers: new HttpHeaders().set("Content-Type", 'application/json')};

    let response=this.api.post('api/colonias', JSON.stringify(colonia), config);
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

}