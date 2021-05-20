import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DebugNode } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import Employee from '../Employee';
import { EmployeeService } from '../employee.service';

import { EmployeeEditComponent } from './employee-edit.component';

describe('EmployeeEditComponent', () => {
  let component: EmployeeEditComponent;
  let fixture: ComponentFixture<EmployeeEditComponent>;
  let router: Router;
  let empService: EmployeeService;
  let activatedRoute:ActivatedRoute

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeEditComponent ],
      imports: [RouterTestingModule, HttpClientModule, ],
      providers:[{
        provide: ActivatedRoute,
        useValue: {
          params: of({id: 123})
        }
      }], 
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeEditComponent);
    component = fixture.componentInstance;

    router = TestBed.inject(Router);
    empService = TestBed.inject(EmployeeService);
    activatedRoute = TestBed.inject(ActivatedRoute);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect to login page when sessionstorage not set',()=>{
    const navigateSpy = spyOn(router, 'navigate');
    sessionStorage.clear();// .setItem("isEmployeeLogin","false");

    component.ngOnInit();

    expect(navigateSpy).toHaveBeenCalledWith(['login']);
  });

  //should have a create and cancel button
  it('should have 2 buttons of type button',()=>{
    const registerForm:any = fixture.debugElement.queryAll(By.css('button'));

    expect(registerForm.length).toEqual(2);
  });

  //should have a update button
  it('should have a "Create Employee" button',()=>{
    const registerForm:any = fixture.debugElement.queryAll(By.css('button'));
    
    expect(registerForm[0].nativeNode.innerText).toEqual("Update");
  });

  //should have a cancel button
  it('should have a "Cancel" button',()=>{
    const registerForm:any = fixture.debugElement.queryAll(By.css('button'));
    
    expect(registerForm[1].nativeNode.innerText).toEqual("Cancel");
  });

  //cancel button should redirect back to home
  it('should redirect to home when cancel button is clicked', ()=>{
    const navigateSpy = spyOn(router, 'navigate');

    component.cancel();

    expect(navigateSpy).toHaveBeenCalledWith(['']);
  });

  //onInit should load employee data from calling service and rendering form
  it('should load employee data and render form on init', ()=>{
    const registerForm:DebugNode = fixture.debugElement.query(By.all());
    
    const testEmp:Employee = {id:123,createdAt:new Date("5/18/2021"), address: '123 main street',avatar: 'http://wwww.google.com', 
                                bio:'Testing the bio textbox',city:'Main City', 
                                datestarted:new Date('3/4/2020'), department:'Finance', 
                                lastreviewdate:new Date('6/7/2020'), name:'Testing Form', 
                                skills:'Work,cook', state:'AL', zipcode:12345};


    const empServiceSpy = spyOn(empService, 'getEmployee').and.returnValue(of(testEmp));

    sessionStorage.setItem("isEmployeeLogin","true");
    component.ngOnInit();

    const address = component.empForm.get('address')?.value; 
    const avatar = component.empForm.get('avatar')?.value;
    const bio = component.empForm.get('bio')?.value;
    const city = component.empForm.get('city')?.value;
    const datestarted = component.empForm.get('datestarted')?.value;
    const department = component.empForm.get('department')?.value;
    const lastreviewdate = component.empForm.get('lastreviewdate')?.value;
    const name = component.empForm.get('name')?.value;
    const skills = component.empForm.get('skills')?.value;
    const state = component.empForm.get('state')?.value;
    const zipcode = component.empForm.get('zipcode')?.value;    

    expect(registerForm.context.empForm.controls.address.value).toEqual(address);
    expect(registerForm.context.empForm.controls.avatar.value).toEqual(avatar);
    expect(registerForm.context.empForm.controls.bio.value).toEqual(bio);
    expect(registerForm.context.empForm.controls.city.value).toEqual(city);
    expect(registerForm.context.empForm.controls.datestarted.value).toEqual(datestarted);
    expect(registerForm.context.empForm.controls.department.value).toEqual(department);
    expect(registerForm.context.empForm.controls.lastreviewdate.value).toEqual(lastreviewdate);
    expect(registerForm.context.empForm.controls.name.value).toEqual(name);
    expect(registerForm.context.empForm.controls.skills.value).toEqual(skills);
    expect(registerForm.context.empForm.controls.state.value).toEqual(state);
    expect(registerForm.context.empForm.controls.zipcode.value).toEqual(zipcode);
    expect(empServiceSpy).toHaveBeenCalled();
  });

  //update button should make call to update record and redirect back to home
  it('should update employee and redirect to home', ()=>{
    const navigateSpy = spyOn(router, 'navigate');
    const empServiceSpy = spyOn(empService, 'updateEmployee').and.returnValue(of({}));

    component.skills.push({name: "work,cook"});

    component.empForm.setValue({address: '123 main street',avatar: 'http://wwww.google.com', 
                                bio:'Testing the bio textbox',city:'Main City', 
                                datestarted:new Date('3/4/2020'), department:'Finance', 
                                lastreviewdate:new Date('6/7/2020'), name:'Testing Form', 
                                skills:'Work,cook', state:'NJ', zipcode:12345});


    component.updateEmployee();

    expect(empServiceSpy).toHaveBeenCalled();
    expect(navigateSpy).toHaveBeenCalledWith(['']);
  });
  
});
