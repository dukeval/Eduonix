import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { Router } from '@angular/router';
import Employee from '../Employee';
import { Skill } from '../employee-edit/employee-edit.component';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-new',
  templateUrl: './employee-new.component.html',
  styleUrls: ['./employee-new.component.css']
})
export class EmployeeNewComponent implements OnInit {
  newEmpForm!: FormGroup;
  skills:Skill[]=[];
  employee!:Employee;
  
  title:string="New Employee"
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  
 
  constructor(private empService:EmployeeService, private route:Router) { 
    this.newEmpForm = new FormGroup({
      name:new FormControl("", [Validators.required]),
      avatar:new FormControl("https://www.centralchristian.edu/wp-content/uploads/2019/07/person-placeholder.png", [Validators.required]),
      address:new FormControl("", [Validators.required]),
      city:new FormControl("", [Validators.required]),
      state:new FormControl("", [Validators.required]),
      zipcode:new FormControl("", [Validators.required]),
      datestarted:new FormControl("", [Validators.required]),
      lastreviewdate: new FormControl("",[Validators.required]),
      department:new FormControl("", [Validators.required]),
      bio:new FormControl("", [Validators.required]),
      skills:new FormControl("", [Validators.required]),
  })
  }

  ngOnInit(): void {
    if(!sessionStorage.getItem("isEmployeeLogin"))
      this.route.navigate(['/login']);
  }

  add(skill:MatChipInputEvent){
    const input = skill.input;
    const value = skill.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.skills.push({name: value.trim()});
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(skill:Skill){
    const index =this.skills.indexOf(skill);

    if(index>-1)
      this.skills.splice(index,1)
    
  }

  createEmployee()
  {
    let employeeToUpdate:Employee = new Employee();
    employeeToUpdate.name = this.newEmpForm.get('name')?.value;
    employeeToUpdate.address = this.newEmpForm.get('address')?.value;
    employeeToUpdate.city = this.newEmpForm.get('city')?.value;
    employeeToUpdate.state = this.newEmpForm.get('state')?.value;
    employeeToUpdate.zipcode = this.newEmpForm.get('zipcode')?.value;
    employeeToUpdate.avatar = this.newEmpForm.get('avatar')?.value;

    employeeToUpdate.bio = this.newEmpForm.get('bio')?.value;
    employeeToUpdate.datestarted = this.newEmpForm.get('datestarted')?.value;
    employeeToUpdate.lastreviewdate = this.newEmpForm.get('lasreviewdate')?.value;
    employeeToUpdate.department = this.newEmpForm.get('department')?.value;
    this.skills.forEach(x=>{
      if(employeeToUpdate.skills !=undefined)
        employeeToUpdate.skills +=`${x.name},`
      else
        employeeToUpdate.skills = `${x.name},`
    });
    if(employeeToUpdate.skills)
      employeeToUpdate.skills=employeeToUpdate.skills.slice(0,employeeToUpdate.skills.length-1);


    this.empService.addEmployee(employeeToUpdate).subscribe(result=>{
      this.route.navigate(['']);
    });    
  }

  cancel(){
    this.route.navigate([''])
  }

}
