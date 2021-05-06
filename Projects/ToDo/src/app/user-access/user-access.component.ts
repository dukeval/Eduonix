import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UseraccessService } from '../useraccess.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-user-access',
  templateUrl: './user-access.component.html',
  styleUrls: ['./user-access.component.css']
})
export class UserAccessComponent implements OnInit {

  login= new FormGroup({
    userName: new FormControl(''),
    password: new FormControl('')
  });
  constructor(private router: Router, private authenticateUser: UseraccessService) { }

  ngOnInit(): void {
  }

  authenticate(){
    if(this.authenticateUser.ValidateUser(this.login.get('userName')?.value, this.login.get('password')?.value))
      this.router.navigate(['todo']);
    else    
      alert('Invalid Credentials');
  }

  getErrorMessage(){

  }
}

// @Component({
//   selector: 'dialog-overview-example-dialog',
//   templateUrl: './user-access.component.html',
// })
// export class DialogOverviewExampleDialog {

//   constructor(
//     public dialogRef: MatDialogRef<DialogOverviewExampleDialog>) {}

//   onNoClick(): void {
//     this.dialogRef.close();
//   }

// }
