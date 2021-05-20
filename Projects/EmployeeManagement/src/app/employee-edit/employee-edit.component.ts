import { Component, OnInit } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { EmployeeService } from '../employee.service';
import Employee from '../Employee';
import { ActivatedRoute, Router } from '@angular/router';
import {map} from 'rxjs/operators';

export interface Skill {
  name: string;
}

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit {
  empForm!: FormGroup;
  skills:Skill[]=[];
  employee!:Employee;
  id:number=0

  title!:string;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  
  constructor(private empService:EmployeeService, private activateRoute:ActivatedRoute, private route:Router) { 
    this.empForm = new FormGroup({
      name:new FormControl("", [Validators.required, Validators.minLength(5)]),
      avatar:new FormControl("", [Validators.required]),
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
    if(sessionStorage.getItem("isEmployeeLogin")== null || sessionStorage.getItem("isEmployeeLogin")=="false")
      this.route.navigate(['login']);

    this.activateRoute.params.subscribe(parameter=>{
      this.id = parameter.id;

      this.empService.getEmployee(parseInt(parameter.id)).subscribe(result=>{
        this.employee = result as Employee;
        
        this.empForm.setValue({
          name: this.employee?.name,
          avatar: this.employee?.name
          ,address: this.employee?.address
          ,city: this.employee?.city
          ,state: this.employee?.state
          ,zipcode: this.employee?.zipcode
          ,skills: this.employee?.skills
          ,datestarted: this.employee?.datestarted
          ,lastreviewdate: this.employee?.lastreviewdate
          ,department: this.employee?.department
          ,bio: this.employee?.bio
        });

        this.employee?.skills.split(',').forEach(skl=>{
          this.skills.push({name: skl})
        });

        this.title = `Edit Employee, ${this.employee?.name}`;

        console.log(this.empForm);
        
      });

      
    });

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

  updateEmployee(){
    let employeeToUpdate:Employee = new Employee();
    employeeToUpdate.name = this.empForm.get('name')?.value;
    employeeToUpdate.address = this.empForm.get('address')?.value;
    employeeToUpdate.city = this.empForm.get('city')?.value;
    employeeToUpdate.state = this.empForm.get('state')?.value;
    employeeToUpdate.zipcode = this.empForm.get('zipcode')?.value;
    employeeToUpdate.avatar = "https://www.centralchristian.edu/wp-content/uploads/2019/07/person-placeholder.png";//this.empForm.get('avatar')?.value;

    employeeToUpdate.bio = this.empForm.get('bio')?.value;
    employeeToUpdate.datestarted = this.empForm.get('datestarted')?.value;
    employeeToUpdate.lastreviewdate = this.empForm.get('lastreviewdate')?.value;
    employeeToUpdate.department = this.empForm.get('department')?.value;
    this.skills.forEach(x=>{
      if(employeeToUpdate.skills !=undefined)
        employeeToUpdate.skills +=`${x.name},`
      else
        employeeToUpdate.skills = `${x.name},`
    });
    employeeToUpdate.skills=employeeToUpdate.skills.slice(0,employeeToUpdate.skills.length-1);

    employeeToUpdate.id= this.id;    

    this.empService.updateEmployee(employeeToUpdate).subscribe(result=>{
      this.route.navigate(['']);
    });    
  }

  cancel(){
    this.route.navigate([''])
  }

}
