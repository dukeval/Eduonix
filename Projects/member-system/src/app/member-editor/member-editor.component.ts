import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLinkActive } from '@angular/router';
import member from 'src/member';
import { MemberService } from '../member.service';

@Component({
  selector: 'app-member-editor',
  templateUrl: './member-editor.component.html',
  styleUrls: ['./member-editor.component.css']
})
export class MemberEditorComponent implements OnInit {

  angForm: FormGroup;
  memberToEdit: member= new member();
  private id:number;

  constructor(private fb:FormBuilder,private router: Router, private activeRouter:ActivatedRoute, private memberService: MemberService) { 
    this.angForm = this.fb.group({
      MemberName: new FormControl('', [Validators.required]),
      MemberBio: new FormControl('', [Validators.required]),
      MemberAge: new FormControl('', [Validators.required]),
    })
  }


  //(click)="updateMember(MemberName.value, MemberBio.value, MemberAge.value)"

  ngOnInit(): void {
    this.activeRouter.params.subscribe(params=>{
      this.id=params.id;
      this.memberService.getMember(this.id).subscribe(res=>{
        this.memberToEdit = res as member;        
      });
    });
    
  }

  updateMember(MemberName:string, MemberBio:string, MemberAge:number){
    this.memberService.updateMember(MemberName,MemberBio, MemberAge,this.id);
    this.router.navigate(['members']);    
  }

}
