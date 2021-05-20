import { HttpClient, HttpHandler } from '@angular/common/http';
import { DebugNode } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { UseraccessService } from '../useraccess.service';

import { RegisterComponent } from './register.component';

describe('LoginComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let router: Router;
  let userAccessService: UseraccessService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
      imports: [RouterTestingModule],
      providers: [UseraccessService, HttpClient, HttpHandler],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;

    router = TestBed.inject(Router);
    userAccessService = TestBed.inject(UseraccessService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //should check that form loads blank username and password
  it('should check that form loads with register button',()=>{
    const registerForm:any = fixture.debugElement.query(By.all());  

    expect(registerForm.childNodes[0].childNodes[0].childNodes.length).toEqual(3);
    expect(registerForm.childNodes[0].childNodes[0].childNodes[2].childNodes[0].name).toEqual('button');
    // expect(registerForm.context.register.controls.password.value).toEqual('');
  });

  //should check that form loads blank username and password
  it('should check that form loads with empty username and password',()=>{
    const registerForm:DebugNode = fixture.debugElement.query(By.all());
    
    expect(registerForm.context.register.controls.userName.value).toEqual('');
    expect(registerForm.context.register.controls.password.value).toEqual('');
  });

  //should check that form is filled with correct data
  it('should check that form filled in with username and password',()=>{
    const registerForm:DebugNode = fixture.debugElement.query(By.all());
    const registerFormGroup = registerForm.context.register;
    const userName:string = 'test';
    const pwd:string = 'testing';

    registerFormGroup.controls.userName.value = userName;
    registerFormGroup.controls.password.value = pwd;
    
    expect(registerFormGroup.controls.userName.value).toEqual(userName);
    expect(registerFormGroup.controls.password.value).toEqual(pwd);
  });

  //should check that missing username or password raised an error
  it('should raised error on missing username or password', ()=>{
    const registerForm:DebugNode = fixture.debugElement.query(By.all());
    const registerFormGroup = registerForm.context.register;

    registerFormGroup.controls.userName.setErrors({'incorrect': true})

    const navigateSpy = spyOn(router, 'navigate');
    const loginServiceSpy = spyOn(userAccessService, 'userRegistration').and.returnValue(of({}));;

    component.registerUser();

    expect(registerFormGroup.controls.valid).toBeFalsy();
    expect(navigateSpy).not.toHaveBeenCalled();

  });

  //should check that userregistration is call
  it('should check userRegistration is call',()=>{
    const loginServiceSpy = spyOn(userAccessService, 'userRegistration').and.returnValue(of({}));;

    component.registerUser();

    expect(loginServiceSpy).toHaveBeenCalled();
  });

  //should check that you can navigate to login page
  it('should check navigate to login page after successful registration',()=>{
    const navigateSpy = spyOn(router, 'navigate');
    const loginServiceSpy = spyOn(userAccessService, 'userRegistration').and.returnValue(of({}));;

    component.registerUser();

    expect(navigateSpy).toHaveBeenCalledWith(['/']);
  });

  //should check that registeruser is called
  it('should check that registeruser is called',()=>{
    const componentSpy = spyOn(component, 'registerUser');

    component.registerUser();

    expect(componentSpy).toHaveBeenCalled();
  });
});
