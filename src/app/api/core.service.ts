import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from "./user";
@Injectable({
  providedIn: 'root'
})
export class CoreService {
  apiURL: string = 'http://localhost:3440/';
  constructor(private httpClient: HttpClient) { }


  public loginUser(user: User) {
    var userPostData = {
      username: user.username,
      password: user.password,
    }
    return this.httpClient.post(this.apiURL + "user/login", userPostData);
  }
  public registerUser() {
  }
}
