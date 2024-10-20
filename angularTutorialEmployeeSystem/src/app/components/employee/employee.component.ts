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
import { JobTitle } from '../../model/JobTitle';
import { Company } from '../../model/Company';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from '../../services/toast.service';
import { message } from '../../model/Message';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgbAlertModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss',
})
export class EmployeeComponent implements OnInit {
  employeeForm!: FormGroup;
  allEmployees: Employee[] = [];
  employeeIdToDelete: string = '';
  jobTitles = Object.values(JobTitle);
  companies = Object.values(Company);

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      job: ['', Validators.required],
      yearsOfExperience: ['', Validators.required],
      company: ['', Validators.required],
      salary: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      postcode: ['', Validators.required],
    });

    this.loadAllEmployees();
  }

  private loadAllEmployees() {
    this.employeeService.getAllEmployees().subscribe({
      next: (res) => {
        this.allEmployees = res;
      },
      error: (err) => {
        this.toastService.addNewToast({
          message: message.EmployeeLoadingFailMessage,
          classname: 'bg-danger text-light',
        });
        console.error(err);
      },
    });
  }

  addEmployee(): void {
    this.employeeService.addNewEmployee(this.employeeForm)?.subscribe({
      next: (res) => {
        console.log(res);
        if (res) {
          this.toastService.addNewToast({
            message: message.EmployeeAdditionSuccessMessage(
              this.employeeForm.value['name']
            ),
            classname: 'bg-success text-light',
          });
          this.loadAllEmployees();
        }
      },
      error: (err) => {
        this.toastService.addNewToast({
          message: message.EmployeeAdditionFailMessage(
            this.employeeForm.value['name']
          ),
          classname: 'bg-danger text-light',
        });
        console.error(err);
      },
    });
  }

  deleteEmployee(id: string) {
    this.employeeService.deleteEmployeeById(id).subscribe({
      next: (res) => {
        if (res) {
          console.log(res);
          this.toastService.addNewToast({
            message: message.EmployeeDeletionSuccessMessage(id),
            classname: 'bg-success text-light',
          });
          this.loadAllEmployees();
        }
      },
      error: (err) => {
        this.toastService.addNewToast({
          message: message.EmployeeDeletionFailMessage(id),
          classname: 'bg-danger text-light',
        });
        console.error(err);
      },
    });
  }
}
