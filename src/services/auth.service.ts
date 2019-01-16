import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ApiProvider} from "../providers/api/api-provider";
import {environment} from "../environments/environment";


@Injectable()
export class AuthService {

private url: string = environment.backendUrl;


  constructor(private api: ApiProvider, private http: HttpClient) {
  }


}