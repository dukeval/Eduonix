import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Employee from './Employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  URL: string = "https://607e491802a23c0017e8b135.mockapi.io/employee";

  constructor(private http:HttpClient) { }

  getEmployees() {
    return this.http.get(this.URL);
  }

  getEmployee(id:number) {
    return this.http.get(`${this.URL}/${id}`)
  }

  deleteEmployee(id: number) {
    return this.http.delete(`${this.URL}/${id}`);
  }

  updateEmployee(emp: Employee) {
    const obj ={
      name:emp.name,
      address:emp.address,
      city:emp.city,      
      state: emp.state,
      zipcode : emp.zipcode,
      avatar : "https://www.centralchristian.edu/wp-content/uploads/2019/07/person-placeholder.png",
      bio : emp.bio,
      datestarted : emp.datestarted,
      lastreviewdate: emp.lastreviewdate,
      department : emp.department,
      skills : emp.skills
    }

    return this.http.put(`${this.URL}/${emp.id}`,obj);
  }

  addEmployee(emp: Employee) {
    const obj ={
      name:emp.name,
      address:emp.address,
      city:emp.city,      
      state: emp.state,
      zipcode : emp.zipcode,
      avatar : "https://www.centralchristian.edu/wp-content/uploads/2019/07/person-placeholder.png",
      bio : emp.bio,
      datestarted : emp.datestarted,
      lastreviewdate: emp.lastreviewdate,
      department : emp.department,
      skills : emp.skills
    }

    return this.http.post(`${this.URL}`,obj);
  }
}
