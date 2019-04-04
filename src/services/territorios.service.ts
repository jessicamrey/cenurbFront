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
  nuevaTerritorio(territoio: Territorio) {
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

}