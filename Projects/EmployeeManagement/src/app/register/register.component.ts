import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UseraccessService } from '../useraccess.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  register= new FormGroup({
    userName: new FormControl(''),
    password: new FormControl('')
  });

  constructor(private authenticateUser: UseraccessService, private route: Router) { }


  ngOnInit(): void {
  }

  registerUser():void{
    if(this.register.valid){
      this.authenticateUser.userRegistration(this.register.get('userName')?.value, this.register.get('password')?.value).subscribe(value=>{
        this.route.navigate(['/']);
      });
    }
  }
}
