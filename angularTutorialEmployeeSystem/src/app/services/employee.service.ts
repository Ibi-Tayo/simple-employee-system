import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../model/Employee';
import { environment } from '../../environments/environment';

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

  getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.url);
  }

  getEmployeeById(id: string): Observable<Employee> {
    return this.http.get<Employee>(`${this.url}/${id}`);
  }

  deleteEmployeeById(id: string): Observable<null> {
   return this.http.delete<null>(`${this.url}/${id}`);
  }
}
