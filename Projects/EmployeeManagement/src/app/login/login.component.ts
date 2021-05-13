import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import UserCredential from 'src/UserCredential';
import { UseraccessService } from '../useraccess.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login= new FormGroup({
    userName: new FormControl(''),
    password: new FormControl('')
  });

  accessGranted:boolean = true;

  constructor(private router: Router, private authenticateUser: UseraccessService) { }

  ngOnInit(): void {
  }

  authenticate(){
    let credentialValid = false;
    const userName =this.login.get('userName')?.value
    const password = this.login.get('password')?.value

    this.authenticateUser.ValidateUser(userName, password).subscribe(valid=>{
      const resp = valid as UserCredential[];

      resp.forEach(res=>{
        if(res.userName.toLowerCase() == userName.toLowerCase() && res.password == password)
          credentialValid= true;
      })

      if(credentialValid){
        sessionStorage.setItem("isEmployeeLogin","true");
        this.router.navigate(['']);}
      else    
        this.accessGranted=false;//alert('Invalid Credentials');
      
    })    
  }
}
