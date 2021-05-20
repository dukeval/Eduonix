import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import Employee from '../Employee';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-get',
  templateUrl: './employee-get.component.html',
  styleUrls: ['./employee-get.component.css']
})
export class EmployeeGetComponent implements OnInit {
  title="Employee Directory";
  totalEmployeeCount!:string;
  employees:Employee[]=[];
  durationInSeconds:number = 5;

  constructor(private empService: EmployeeService,private route:Router,private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    if(sessionStorage.getItem("isEmployeeLogin")== null || sessionStorage.getItem("isEmployeeLogin")=="false")
      this.route.navigate(['login']);

    this.empService.getEmployees().subscribe(result=>{
      this.employees = result as Employee[];
    });
  }

  updateEmployee(id:number){
    this.route.navigate(['edit',id]);
  }

  deleteEmployee(id:number){
    this.empService.deleteEmployee(id).subscribe(result=>{
      this.empService.getEmployees().subscribe(result=>{
        this.employees = result as Employee[];
        
        this.totalEmployeeCount = this.employees.length.toString();
      });

      this.snackBar.openFromComponent(TaskCompleteComponent, {
        duration: this.durationInSeconds * 1000,
      });
    });    
  }

  refreshEmployeeCount(){
    console.log('I am hit');
    
  }

}

@Component({
  selector: 'snack-bar-component-example-snack',
  template:'<span class="example-pizza-party">{{taskName}}</span>',
  styles: [`
    .example-pizza-party {
      color: hotpink;
    }
  `],
})

export class TaskCompleteComponent {
  taskName:string='';

  
  constructor(){
this.taskName = `completed!`;
  }
}
