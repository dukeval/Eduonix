import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import Employee from '../Employee';
import { EmployeeService } from '../employee.service';

import { HeaderTemplateComponent } from './header-template.component';

describe('HeaderTemplateComponent', () => {
  let component: HeaderTemplateComponent;
  let fixture: ComponentFixture<HeaderTemplateComponent>;
  let empService: EmployeeService;
  let router:Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderTemplateComponent ],
      imports: [FormsModule, RouterTestingModule, HttpClientModule,MatToolbarModule,MatButtonModule,MatIconModule,MatBadgeModule],
      providers: [EmployeeService, ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderTemplateComponent);
    component = fixture.componentInstance;

    empService = TestBed.inject(EmployeeService);
    router = TestBed.inject(Router);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have toolbar color set', ()=>{
    expect(fixture.debugElement.query(By.css('.mat-toolbar')).context.color).toEqual("primary");
  });

  it('should have icon button', ()=>{
    expect(fixture.debugElement.query(By.css('button')).context.isIconButton).toBeTruthy();
  });

  it('should display blank title on load', ()=>{
    expect(fixture.nativeElement.querySelector('#title').textContent).toEqual('');
  });

  it('should display blank title on load', ()=>{
    expect(fixture.nativeElement.querySelector('#title').textContent).toEqual('');
  });

  it('should call and wait for getEmployees to return value', ()=>{
    const testEmp:Employee[] = [];
    const empSrvcSpy = spyOn(empService, 'getEmployees').and.returnValue(of(testEmp));

    component.ngOnInit();

    expect(empSrvcSpy).toHaveBeenCalled();
  });

  it('should display totalEmployee Badge to 0', ()=>{
    const testEmp:Employee[] = [];

    const empSrvcSpy = spyOn(empService, 'getEmployees').and.returnValue(of(testEmp));

    component.ngOnInit();

    expect(empSrvcSpy).toHaveBeenCalled();
    expect(fixture.debugElement.query(By.css('#employeeBadge')).childNodes[0].parent?.parent?.parent?.context.totalEmployee).toEqual("0");
  });

  it('should display totalEmployee to equal correct number of Badges', ()=>{
    const testEmp:Employee[] = [{id:1,name:"Jeff Vax", city:"", state:"", address:"13 main st", avatar:"",zipcode:123,datestarted:new Date("1/1/2021"),department:"test",bio:"bio 1",skills:"type", createdAt:new Date("5/14/2021"),lastreviewdate:new Date("5/14/2021")},
                                {id:2,name:"Jeff Vaxer", city:"", state:"", address:"13 Avenue Americas", avatar:"",zipcode:123,datestarted:new Date("1/1/2021"),department:"test",bio:"bion 2",skills:"type", createdAt:new Date("5/14/2021"),lastreviewdate:new Date("5/14/2021")}
  ];

    const empSrvcSpy = spyOn(empService, 'getEmployees').and.returnValue(of(testEmp));

    component.ngOnInit();

    expect(empSrvcSpy).toHaveBeenCalled();
    expect(fixture.debugElement.query(By.css('#employeeBadge')).childNodes[0].parent?.parent?.parent?.context.totalEmployee).toEqual(testEmp.length.toString());
  });

  it('should navigate to add page when new Employee called', ()=>{
    const testEmp:Employee[] = [ ];

    const empSrvcSpy = spyOn(empService, 'getEmployees').and.returnValue(of(testEmp));
    const routerSpy = spyOn(router, 'navigate');

    component.addEmployee();

    expect(routerSpy).toHaveBeenCalledWith(['add']);
  });

  it('should display the title', ()=>{
    component.title = "Testing 123";

    expect(fixture.debugElement.query(By.css('#title')).childNodes[0].parent?.context.title).toEqual(component.title);
  });

});
