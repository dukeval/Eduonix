import { Component, OnInit } from '@angular/core';
import member from 'src/member';
import { MemberService } from '../member.service';

@Component({
  selector: 'app-member-get',
  templateUrl: './member-get.component.html',
  styleUrls: ['./member-get.component.css']
})
export class MemberGetComponent implements OnInit {

  members:member[];

  constructor(private memberService:MemberService) { }

  ngOnInit(): void {
    this.memberService.loadMembers().subscribe(res=>{
      this.members = res as member[];
    });
  }

  DropMember(memberID:number):void{
    //Could've Slice the array after the delete to remove the item but chose to reload the page and pull it from online storage instead.    
    this.memberService.dropMember(memberID).subscribe(res=>{
      location.reload();   
    });
  }

}
