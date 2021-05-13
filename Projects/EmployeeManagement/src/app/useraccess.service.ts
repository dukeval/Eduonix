import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import UserCredential from 'src/UserCredential';

@Injectable({
  providedIn: 'root'
})

export class UseraccessService {
  private URL: string = "https://607e491802a23c0017e8b135.mockapi.io/login";

  constructor(private http:HttpClient) { }
  
  ValidateUser(userName: string, password: string) {    
    return this.http.get(this.URL)
  }

  userRegistration(userName: string, password: string):Observable<object> {
    const credentials = {
      userName,password
    }

    return this.http.post(this.URL, credentials);
  }
}
