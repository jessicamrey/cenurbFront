import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';


@Injectable()
export class ApiProvider {
	 private url: string = environment.backendUrl;


  constructor(public http: HttpClient) {

  }

  get(endpoint: string, options?: any) {

    return this.http.get<any>(this.url + '/' + endpoint, options);
  }

  post(endpoint: string, body: any, options?: any) {
    
    return this.http.post<any>(this.url + '/' + endpoint, body, options);
  }


  put(endpoint: string, body: any, options?: any) {
    return this.http.put(this.url + '/' + endpoint, body, options);
  }

  delete(endpoint: string, options?: any) {
    
    return this.http.delete(this.url + '/' + endpoint, options);
  }

  patch(endpoint: string, body: any, options?: any) {
    return this.http.put(this.url + '/' + endpoint, body, options);
  }

  public getUrl() {
    return this.url;
  }

}

