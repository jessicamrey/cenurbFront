import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ApiProvider} from "../providers/api/api-provider";
import {environment} from "../environments/environment";
import {TempUser} from '../models/temp-user';

@Injectable()
export class AuthService {

private url: string = environment.backendUrl;


  constructor(private api: ApiProvider, private http: HttpClient) {
  }

  loginAnonymous(tempUser: TempUser) {
    let config = {headers: new HttpHeaders().set("Content-Type", 'application/json')};

    let response=this.api.post('api/loginAnonymous', JSON.stringify(tempUser), config);
    return response;
  }

  


}