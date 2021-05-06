import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UseraccessService {
  registerUsers: {
    userName: string,
    password: string;
  }[]=[];

  user:string='';
  authenticated:boolean=false;

  constructor() { }

  userRegistration(userName:string, password:string):boolean {    
    this.registerUsers.push({userName:userName, password:password});
    
    return true;
  }

  ValidateUser(userName:string, password:string):boolean {
    let valid:boolean = false;
    this.registerUsers.forEach(usr=>{
      if(usr.userName == userName && usr.password == password){
        valid= true;
        this.authenticated=true;
        this.user=userName;
      }
    })
    
    return valid;
  }

}
