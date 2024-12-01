import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../model/Employee';
import { environment } from '../../environments/environment';
import { PaginatedEmployeeResponse } from '../model/PaginatedEmployeeResponse';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  url: string = `${environment.apiUrl}/employees`;

  constructor(private http: HttpClient) {}

  addNewEmployee(employeeForm: FormGroup): Observable<Employee> | null {
    if (employeeForm.valid) {
      const employeeData: Employee = employeeForm.value;
      return this.http.post<Employee>(this.url, employeeData);
    }
    return null;
  }

  updateEmployee(employeeForm: FormGroup, id: string) : Observable<Employee> | null {
    if (employeeForm.valid) {
      const employeeData: Employee = employeeForm.value;
      return this.http.put<Employee>(`${this.url}/${id}`, employeeData);
    }
    return null;
  }

  getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.url);
  }

  // /posts?_page=1&_per_page=25
  getPaginatedEmployees(pageNo: number, perPage: number): Observable<PaginatedEmployeeResponse> {
    return this.http.get<PaginatedEmployeeResponse>(`${this.url}?_page=${pageNo}&_per_page=${perPage}`)
  }

  getEmployeeById(id: string): Observable<Employee> {
    return this.http.get<Employee>(`${this.url}/${id}`);
  }

  deleteEmployeeById(id: string): Observable<null> {
   return this.http.delete<null>(`${this.url}/${id}`);
  }
}
