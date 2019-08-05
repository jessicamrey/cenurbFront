import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ApiProvider} from "../providers/api/api-provider";
import {environment} from "../environments/environment";
import {TempUser} from '../models/temp-user';
import {map} from 'rxjs/operators';

@Injectable()
export class AuthService {

private url: string = environment.backendUrl;


  constructor(private api: ApiProvider, private http: HttpClient) {
  }



   login(accountData: any): any {

    var body = "username=" + accountData.username + "&password=" + accountData.password + "&grant_type=" + environment.grant_type + "&client_id=" + environment.client_id + "&client_secret=" + environment.client_secret;

    let config = {headers: new HttpHeaders().set("Content-Type", 'application/x-www-form-urlencoded')};

    return this.api.post('api/login', body, config)
      .pipe(map(user => {
        // login successful if there's a jwt token in the response
        if (user && user) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          
        }
        return user;
      }));
  }

  //Sabemos si es la primera ez que el usuario se logea en nuestra aplicación
  isRegistered(id) {
    let config = {headers: new HttpHeaders().set("Content-Type", 'application/json')};

    let response=this.http.post(this.url + '/api/isRegistered', JSON.stringify(id), config);
    return response;
  
  }

  //Nos registramos en la aplicacion
  register(data) {
    let config = {headers: new HttpHeaders().set("Content-Type", 'application/json')};

    let response=this.http.post(this.url + '/api/register', JSON.stringify(data), config);
    return response;
  
  }

  //Guardaremos si es admin
  isAdmin() {
    return this.http.get<any>(this.url + '/api/isAdmin');
  }



}