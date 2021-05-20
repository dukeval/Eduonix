import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import Employee from './Employee';
import { EmployeeService } from './employee.service';
import {HttpTestingController, HttpClientTestingModule} from '@angular/common/http/testing';

describe('EmployeeService', () => {
  let service: EmployeeService;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule,HttpClientTestingModule],
      providers:[EmployeeService]
    })
      .compileComponents();
    });

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeService);
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    httpMock.verify();
});

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get list of employee',()=>{
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

    service.getEmployees().subscribe(res=>{        
      let emp = res  as Employee[];
      
      expect(emp.length).toBe(3);  
    });

    const request = httpMock.expectOne(service.URL);
    expect(request.request.method).toBe('GET');
    request.flush(testEmp);
  });
});
