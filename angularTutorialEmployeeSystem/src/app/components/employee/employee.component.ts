import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Employee } from '../../model/Employee';
import { EmployeeService } from '../../services/employee.service';


@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss',
})
export class EmployeeComponent implements OnInit {
  employeeForm!: FormGroup;
  allEmployees: Employee[] = [];
  employeeIdToDelete: number = 0;

  constructor(private fb: FormBuilder, private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      company: ['', Validators.required],
      salary: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      postcode: ['', Validators.required]
    });

    this.loadAllEmployees();
  }

  private loadAllEmployees() {
    this.employeeService.getAllEmployees().subscribe({
      next: (res) => {
        this.allEmployees = res;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  onSubmit(): void {
    this.employeeService.addNewEmployee(this.employeeForm)?.subscribe({
      next: (res) => {
        console.log(res);
        if (res) {
          alert('success! employee has been added');
          this.loadAllEmployees();
        } else {
          alert('employee was not added');
        }
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  deleteEmployee(id: number) {
    this.employeeService.deleteEmployeeById(id).subscribe({
      next: (res) => {
        if (res) {
          console.log(res);
          alert(`employee with id: ${id} has been deleted`)
          this.loadAllEmployees();
        } else {
        }
      },
      error: (err) => {
        console.error(err);
        alert('employee was not deleted for some reason')
      }
    })
  }
}
