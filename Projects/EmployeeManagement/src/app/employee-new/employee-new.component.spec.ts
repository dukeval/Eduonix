import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, DebugNode, ElementRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipInput, MatChipInputEvent, MatChipsModule, MAT_CHIPS_DEFAULT_OPTIONS } from '@angular/material/chips';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { AppRoutingModule } from '../app-routing.module';
import { EmployeeService } from '../employee.service';
import { HeaderTemplateComponent } from '../header-template/header-template.component';

import { EmployeeNewComponent } from './employee-new.component';

describe('EmployeeNewComponent', () => {
  let component: EmployeeNewComponent;
  let fixture: ComponentFixture<EmployeeNewComponent>;
  let router: Router;
  let empService: EmployeeService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeeNewComponent],
      imports: [RouterTestingModule,MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatToolbarModule,
        MatBadgeModule,
        MatCardModule,
        MatSnackBarModule,
        MatChipsModule,    
        MatDatepickerModule,
        MatNativeDateModule,
        BrowserAnimationsModule,HttpClientModule,AppRoutingModule
        ],
        schemas: [
          CUSTOM_ELEMENTS_SCHEMA,
        ],
      providers : [ 
        MatChipInput,MatLabel,
        EmployeeService , ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeNewComponent);
    component = fixture.componentInstance;

    router = TestBed.inject(Router);
    empService = TestBed.inject(EmployeeService);

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

  //should have blanks for all input box on load
  it('should load form with blank entry boxes', ()=>{
    const registerForm:DebugNode = fixture.debugElement.query(By.all());
    
    sessionStorage.setItem("isEmployeeLogin","true");

    expect(registerForm.context.newEmpForm.controls.address.value).toEqual('');
    expect(registerForm.context.newEmpForm.controls.avatar.value).toEqual('https://www.centralchristian.edu/wp-content/uploads/2019/07/person-placeholder.png');
    expect(registerForm.context.newEmpForm.controls.bio.value).toEqual('');
    expect(registerForm.context.newEmpForm.controls.city.value).toEqual('');
    expect(registerForm.context.newEmpForm.controls.datestarted.value).toEqual('');
    expect(registerForm.context.newEmpForm.controls.department.value).toEqual('');
    expect(registerForm.context.newEmpForm.controls.lastreviewdate.value).toEqual('');
    expect(registerForm.context.newEmpForm.controls.name.value).toEqual('');
    expect(registerForm.context.newEmpForm.controls.skills.value).toEqual('');
    expect(registerForm.context.newEmpForm.controls.state.value).toEqual('');
    expect(registerForm.context.newEmpForm.controls.zipcode.value).toEqual('');
  });

  //should have input box fill in with formGroup data
  it('should fill input box with formGroup data', ()=>{
    const registerForm:DebugNode = fixture.debugElement.query(By.all());
    
    sessionStorage.setItem("isEmployeeLogin","true");

    component.newEmpForm.setValue({address: '123 main street',avatar: 'http://wwww.google.com', 
                                                   bio:'Testing the bio textbox',city:'Main City', 
                                                   datestarted:new Date('3/4/2020'), department:'Finance', 
                                                   lastreviewdate:new Date('6/7/2020'), name:'Testing Form', 
                                                   skills:'Work', state:'AL', zipcode:12345});

    const address = component.newEmpForm.get('address')?.value; 
    const avatar = component.newEmpForm.get('avatar')?.value;
    const bio = component.newEmpForm.get('bio')?.value;
    const city = component.newEmpForm.get('city')?.value;
    const datestarted = component.newEmpForm.get('datestarted')?.value;
    const department = component.newEmpForm.get('department')?.value;
    const lastreviewdate = component.newEmpForm.get('lastreviewdate')?.value;
    const name = component.newEmpForm.get('name')?.value;
    const skills = component.newEmpForm.get('skills')?.value;
    const state = component.newEmpForm.get('state')?.value;
    const zipcode = component.newEmpForm.get('zipcode')?.value;

    expect(registerForm.context.newEmpForm.controls.address.value).toEqual(address);
    expect(registerForm.context.newEmpForm.controls.avatar.value).toEqual(avatar);
    expect(registerForm.context.newEmpForm.controls.bio.value).toEqual(bio);
    expect(registerForm.context.newEmpForm.controls.city.value).toEqual(city);
    expect(registerForm.context.newEmpForm.controls.datestarted.value).toEqual(datestarted);
    expect(registerForm.context.newEmpForm.controls.department.value).toEqual(department);
    expect(registerForm.context.newEmpForm.controls.lastreviewdate.value).toEqual(lastreviewdate);
    expect(registerForm.context.newEmpForm.controls.name.value).toEqual(name);
    expect(registerForm.context.newEmpForm.controls.skills.value).toEqual(skills);
    expect(registerForm.context.newEmpForm.controls.state.value).toEqual(state);
    expect(registerForm.context.newEmpForm.controls.zipcode.value).toEqual(zipcode);
  });

  //should have a create and cancel button
  it('should have 4 buttons of type button',()=>{
    const registerForm:any = fixture.debugElement.queryAll(By.css('button'));

    expect(registerForm.length).toEqual(4);
    // expect(registerForm[0].nativeNode.localName).toEqual("button");
    // expect(registerForm[1].nativeNode.localName).toEqual("button");
  });

  //should have a create employee button
  it('should have a "Create Employee" button',()=>{
    const registerForm:any = fixture.debugElement.queryAll(By.css('button'));
    
    expect(registerForm[2].nativeNode.innerText).toEqual("Create Employee");
  });

  //should have a cancel button
  it('should have a "Cancel" button',()=>{
    const registerForm:any = fixture.debugElement.queryAll(By.css('button'));
    
    expect(registerForm[3].nativeNode.innerText).toEqual("Cancel");
  });

  //cancel button should redirect back to home
  it('should redirect to home when cancel button is clicked', ()=>{
    const navigateSpy = spyOn(router, 'navigate');

    component.cancel();

    expect(navigateSpy).toHaveBeenCalledWith(['']);
  });

  //create button should make call to create a new employee and redirect back to home
  it('should create new employee and redirect to home', ()=>{
    const navigateSpy = spyOn(router, 'navigate');
    const loginServiceSpy = spyOn(empService, 'addEmployee').and.returnValue(of({}));;

    component.createEmployee();

    expect(loginServiceSpy).toHaveBeenCalled();
    expect(navigateSpy).toHaveBeenCalledWith(['']);
  });

  // //skills are properly being addes to list
  // it('should fill skills list with correct skill',()=>{
  //   let listElem:ElementRef = new ElementRef<HTMLInputElement>(new HTMLInputElement());

  //   let elem:MatChipInput = new MatChipInput(listElem, MAT_CHIPS_DEFAULT_OPTIONS);

  //   component.add(elem);

  // });

});
