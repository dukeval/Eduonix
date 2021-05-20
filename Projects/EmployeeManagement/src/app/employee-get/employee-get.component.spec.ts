import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { AppRoutingModule } from '../app-routing.module';
import Employee from '../Employee';
import { EmployeeService } from '../employee.service';

import { EmployeeGetComponent } from './employee-get.component';

describe('EmployeeGetComponent', () => {
  let component: EmployeeGetComponent;
  let fixture: ComponentFixture<EmployeeGetComponent>;
  let router:Router;
  let empService: EmployeeService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeGetComponent ],
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
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeGetComponent);
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

  it('should call getEmployees from service to load list of employee',()=>{
    // const testEmp:Employee[] = [{id:123,createdAt:new Date("5/18/2021"), address: '123 main street',avatar: 'http://wwww.google.com', 
    //                             bio:'Testing the bio textbox',city:'Main City', 
    //                             datestarted:new Date('3/4/2020'), department:'Finance', 
    //                             lastreviewdate:new Date('6/7/2020'), name:'Testing Form', 
    //                             skills:'Work,cook', state:'AL', zipcode:12345},
    //                             {id:124,createdAt:new Date("5/18/2021"), address: '123 main street',avatar: 'http://wwww.google.com', 
    //                             bio:'Testing the bio textbox',city:'Main City', 
    //                             datestarted:new Date('3/4/2020'), department:'Finance', 
    //                             lastreviewdate:new Date('6/7/2020'), name:'Testing Form', 
    //                             skills:'Work,cook', state:'AL', zipcode:12345},
    //                             {id:125,createdAt:new Date("5/18/2021"), address: '123 main street',avatar: 'http://wwww.google.com', 
    //                             bio:'Testing the bio textbox',city:'Main City', 
    //                             datestarted:new Date('3/4/2020'), department:'Finance', 
    //                             lastreviewdate:new Date('6/7/2020'), name:'Testing Form', 
    //                             skills:'Work,cook', state:'AL', zipcode:12345}];

    const empServiceSpy = spyOn(empService, 'getEmployees').and.returnValues(of([{}]));

    sessionStorage.setItem("isEmployeeLogin","true");

    component.ngOnInit();

    expect(empServiceSpy).toHaveBeenCalledWith();
  });

  it('should load list of employee',()=>{
    const testEmp:Employee[] = [{id:123,createdAt:new Date("5/18/2021"), address: '123 main street',avatar: 'http://wwww.google.com', 
                                bio:'Testing the bio textbox',city:'Main City', 
                                datestarted:new Date('3/4/2020'), department:'Finance', 
                                lastreviewdate:new Date('6/7/2020'), name:'Testing Form', 
                                skills:'Work,cook', state:'AL', zipcode:12345},
                                {id:124,createdAt:new Date("5/18/2021"), address: '123 main street',avatar: 'http://wwww.google.com', 
                                bio:'Testing the bio textbox',city:'Main City', 
                                datestarted:new Date('3/4/2020'), department:'Finance', 
                                lastreviewdate:new Date('6/7/2020'), name:'Testing Form', 
                                skills:'Work,cook', state:'AL', zipcode:12345},
                                {id:125,createdAt:new Date("5/18/2021"), address: '123 main street',avatar: 'http://wwww.google.com', 
                                bio:'Testing the bio textbox',city:'Main City', 
                                datestarted:new Date('3/4/2020'), department:'Finance', 
                                lastreviewdate:new Date('6/7/2020'), name:'Testing Form', 
                                skills:'Work,cook', state:'AL', zipcode:12345}];

    const empServiceSpy = spyOn(empService, 'getEmployees').and.returnValues(of(testEmp));

    sessionStorage.setItem("isEmployeeLogin","true");

    component.ngOnInit();

    expect(component.employees.length).toEqual(3);
  });

});
