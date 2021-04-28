import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import member from '../member';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
private URL: string = "https://607e491802a23c0017e8b135.mockapi.io/member";
  constructor(private http:HttpClient) { }

  addMember(MemberName:string, MemberBio: string, MemberAge:number){
    const obj = {
      MemberName,MemberBio, MemberAge
    }

    this.http.post(this.URL,obj).subscribe(res =>{
      console.log(res);      
    })
  }

  loadMembers(){ 
    return this.http.get(this.URL)
  }

  getMember(id: number) {
    return this.http.get(`${this.URL}/${id}`);
  }

  updateMember(MemberName: string, MemberBio: string, MemberAge: number, id:number) {
    const obj ={
      MemberName, MemberBio, MemberAge
    }

    this.http.put(`${this.URL}/${id}`, obj).subscribe(res=>{
      console.log(res);
      
    })
  }

  dropMember(id:number){
    return this.http.delete(`${this.URL}/${id}`);
  }
}
