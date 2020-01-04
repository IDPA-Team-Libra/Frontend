import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import {UserService } from "./user.service";
@Injectable({
  providedIn: 'root'
})
export class PerformanceService {
  constructor(private httpClient: HttpClient, private userService : UserService) { }
  apiURL: string = environment.api_url;

  public loadUserPerformance() {
    var body = {
      username: this.userService.getUsername(),
      accessToken: this.userService.getAuthToken(),
    };
    var data = this.httpClient.post(this.apiURL + "performance/get",body).toPromise();
    return data;
  } 
}
