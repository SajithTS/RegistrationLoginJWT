import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUri = "http://localhost:51445/api/";
  constructor(private http:HttpClient) { }
  register(body:any){
    return this.http.post(this.baseUri + 'ApplicationUser/register',body);
  }

  login(body:any){
    return this.http.post(this.baseUri + 'ApplicationUser/login',body);
  }

  getUserProfile(){
    return this.http.get(this.baseUri + '/UserProfile');
  }
}
