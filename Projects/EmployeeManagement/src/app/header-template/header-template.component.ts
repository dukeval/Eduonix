import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Employee from '../Employee';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-header-template',
  templateUrl: './header-template.component.html',
  styleUrls: ['./header-template.component.css']
})
export class HeaderTemplateComponent implements OnInit {
  @Input() title!: string;// ="Edit Employee"; 
  @Input() totalEmployee!:string;

  constructor(private route:Router, private empService:EmployeeService) { }

  ngOnInit(): void {
    this.empService.getEmployees().subscribe(result=>{
      this.totalEmployee = (result as Employee[]).length.toString();
    });
  }

  addEmployee(){
    this.route.navigate(['add']);
  }

}
