import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import {UserService } from "./user.service";
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';
import { LZStringService } from 'ng-lz-string';@Injectable({
  providedIn: 'root'
})
export class PerformanceService {
  constructor(private httpClient: HttpClient, private userService : UserService,private compressionService: LZStringService, @Inject(SESSION_STORAGE) private storageService: StorageService, ) { }
  apiURL: string = environment.api_url;

  public loadUserPerformance() {
    var body = {
      username: this.userService.getUsername(),
      accessToken: this.userService.getAuthToken(),
    };
    var data = this.httpClient.post(this.apiURL + "performance/get",body).toPromise();
    return data;
  } 

  public getPerformanceData(){
    return this.compressionService.decompress(this.storageService.get("performance_data"));
  }
}
