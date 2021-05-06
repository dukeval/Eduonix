import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { FormControl, FormGroup } from '@angular/forms';
import { ThisReceiver } from '@angular/compiler';
import { UseraccessService } from '../useraccess.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.css'],
  animations:[
    trigger('slide',[
      state('enter',style({transform:'translateX(0)', fontSize:'30px'})),
      transition(':enter',[style({transform:'translateX(-500%)', fontSize:'40px'}),animate('700ms ease-in')])
    ]),
    trigger('toDoCompleted',[
      state('true',style({textDecoration: 'line-through', color:'green', fontWeight:'Bolder', fontSize:'20px' }))
    ]),
  ]
})
export class ToDoComponent implements OnInit {
  userName:string='';
  totalToDo:number = 0;
  toDos: string[]=[];
  counter:number =1;
  newToDoInput:string="";
  inputType="checkbox"
  origToDoValue:string='';

  constructor(private authenticateUser:UseraccessService, private route:Router) { }

  ngOnInit(): void {
    if(this.authenticateUser.authenticated)
      this.userName = this.authenticateUser.user;
    else{
      this.route.navigate(['/'])
    }
  }
  addToList():void{
    //if input has value and not in edit mode
    if(this.newToDoInput!='' && this.origToDoValue=='')
    {
      this.totalToDo+=1;
      this.toDos.push(this.newToDoInput);
      this.counter+=1;  
      this.newToDoInput="";
    }

    //If in Edit mode, check to see if array has the original value and 
    //update it with the new input and reset input and edit mode.
    if(this.toDos.indexOf(this.origToDoValue)>-1){
      this.toDos[this.toDos.indexOf(this.origToDoValue)] = this.newToDoInput;
      this.newToDoInput="";
      this.origToDoValue="";
    }
  }

  taskCompleted(state:any):void{
    
    if(this.totalToDo>0 && state)
      this.totalToDo-=1;
    
    if(!state)
      this.totalToDo+=1;
  }

  editTask(task:any){
    //set it to edit mode and saved the original value and display it in input box.
    this.origToDoValue= task.toElement.firstChild.data.trim();
    this.newToDoInput=task.toElement.firstChild.data.trim();
    
  }
}
