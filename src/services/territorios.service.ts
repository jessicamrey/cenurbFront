import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ApiProvider} from "../providers/api/api-provider";
import {environment} from "../environments/environment";
import {EventEmitter} from '@angular/core';

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

}