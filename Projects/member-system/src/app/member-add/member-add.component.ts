import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validator, Validators, FormControl} from '@angular/forms'
import { Router } from '@angular/router';
import { MemberService } from '../member.service';

@Component({
  selector: 'app-member-add',
  templateUrl: './member-add.component.html',
  styleUrls: ['./member-add.component.css']
})
export class MemberAddComponent implements OnInit {
  angForm: FormGroup;

  constructor(private fb:FormBuilder, private member: MemberService, private router:Router) {
    this.createForm();
   }

  ngOnInit(): void {
  }

  createForm(){
    this.angForm = this.fb.group({
      MemberName: new FormControl('', [Validators.required]),
      MemberBio: new FormControl('', [Validators.required]),
      MemberAge: new FormControl('', [Validators.required]),
    })
  }

  addMember(){
    //console.log(this.angForm.controls.MemberName.value);
    this.member.addMember(this.angForm.controls.MemberName.value, this.angForm.controls.MemberBio.value, this.angForm.controls.MemberAge.value);
    this.router.navigate(['members']);
  }

}
