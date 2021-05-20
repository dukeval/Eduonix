import {  HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';
import UserCredential from 'src/UserCredential';
import { AppRoutingModule } from '../app-routing.module';
import { UseraccessService } from '../useraccess.service';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let router:Router;
  let userAccessService: UseraccessService;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [RouterTestingModule],
      providers: [
        MatButtonModule,
        //MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        //MatToolbarModule,
        //MatBadgeModule,        
        BrowserAnimationsModule,
        MatLabel,
        
        UseraccessService, HttpClientModule, HttpClient, HttpHandler, AppRoutingModule]
    })
    .compileComponents();

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;

    router = TestBed.inject(Router);
    userAccessService = TestBed.inject(UseraccessService);

    fixture.detectChanges();
  });

  it('should create', () => {
    console.log(fixture.debugElement.queryAll(By.css('input')));
    expect(component).toBeTruthy();
  });

  it('should have 2 input boxes', () => {
    expect(fixture.debugElement.queryAll(By.css('input')).length).toEqual(2);
  });

  it('should have 1 button and 1 link button', () => {
    expect(fixture.debugElement.queryAll(By.css('button')).length).toEqual(1);
    expect(fixture.debugElement.queryAll(By.css('a')).length).toEqual(1);
  });


  it('the username should be defaulted', () => {
    expect(component.login.get('userName')?.value).toEqual('');
  });

  it('the password should be defaulted on load', () => {
    expect(component.login.get('password')?.value).toEqual('');
  });

  it('the error message should not be displayed on load', () => {
    expect(component.accessGranted).toBe(true);
  });

  it('should navigate to home page after login', () => {
    const userCred: UserCredential[] = [{userName:"", password:""}];

    const navigateSpy = spyOn(router, 'navigate');
    const loginServiceSpy = spyOn(userAccessService, 'ValidateUser').and.returnValue(of(userCred));;

    component.authenticate();  
    
    // expect(component.accessGranted).toBeFalsy();
    //expect(loginServiceSpy).toHaveBeenCalled();

    expect(navigateSpy).toHaveBeenCalledWith(['']);
  });

  it('should not navigate if login failed and display error', () => {
    const userCred: UserCredential[] = [{userName:"red", password:"red"}];

    const navigateSpy = spyOn(router, 'navigate');
    const loginServiceSpy = spyOn(userAccessService, 'ValidateUser').and.returnValue(of(userCred));;

    component.authenticate();

    expect(navigateSpy).not.toHaveBeenCalled();
    expect(component.accessGranted).toBeFalsy();
  });

});
