import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Employee } from '../../model/Employee';
import { EmployeeService } from '../../services/employee.service';
import { NgbAlertModule, NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from '../../services/toast.service';
import { message } from '../../model/Message';
import { EmployeeFormComponent } from '../employee-form/employee-form.component';
import { CommonModule } from '@angular/common';
import { catchError, EMPTY, map, Observable, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [
    NgbPagination,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbAlertModule,
    EmployeeFormComponent,
  ],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss',
})
export class EmployeeComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  allEmployees$: Observable<Employee[]> | undefined;
  paginatedEmployees$: Observable<Employee[]> | undefined;
  currentPageNumber: number = 1;
  employeesPerPage: number = 6;
  employeeIdToDelete: string = '';
  employeeIdToUpdate: string = '';
  employeeToUpdate: Employee | null = null;
  showUpdateEmployee = false;

  constructor(
    private employeeService: EmployeeService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.loadAllEmployees();
    this.getPaginatedEmployees(this.currentPageNumber, this.employeesPerPage);
  }

  loadAllEmployees() {
    this.allEmployees$ = this.employeeService.getAllEmployees().pipe(
      catchError((err) => {
        this.toastService.addNewToast({
          message: message.EmployeeLoadingFailMessage,
          classname: 'bg-danger text-light',
        });
        return EMPTY;
      })
    );
  }

  getPaginatedEmployees(currentPageNo: number, employeesPerPage: number) {
    this.paginatedEmployees$ = this.employeeService
      .getPaginatedEmployees(currentPageNo, employeesPerPage)
      .pipe(
        map((em) => em.data),
        catchError((err) => {
          this.toastService.addNewToast({
            message: message.EmployeeLoadingFailMessage,
            classname: 'bg-danger text-light',
          });
          return EMPTY;
        })
      );
  }

  addEmployee(employeeForm: FormGroup): void {
    this.employeeService
      .addNewEmployee(employeeForm)
      ?.pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          console.log(res);
          if (res) {
            this.toastService.addNewToast({
              message: message.EmployeeAdditionSuccessMessage(
                employeeForm.value['name']
              ),
              classname: 'bg-success text-light',
            });
            this.loadAllEmployees();
          }
        },
        error: (err) => {
          this.toastService.addNewToast({
            message: message.EmployeeAdditionFailMessage(
              employeeForm.value['name']
            ),
            classname: 'bg-danger text-light',
          });
          console.error(err);
        },
      });
  }

  updateEmployee(employeeForm: FormGroup, id: string) {
    let employeeName: string = employeeForm.get('name')?.value;
    this.employeeService
      .updateEmployee(employeeForm, id)
      ?.pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          console.log(res);
          if (res) {
            this.toastService.addNewToast({
              message: message.EmployeeUpdateSuccessMessage(employeeName),
              classname: 'bg-success text-light',
            });
            this.loadAllEmployees();
            this.showUpdateEmployee = false;
          }
        },
        error: (err) => {
          this.toastService.addNewToast({
            message: message.EmployeeUpdateFailMessage(employeeName),
            classname: 'bg-danger text-light',
          });
          console.error(err);
        },
      });
  }

  getEmployeeByIdForUpdate(id: string): Employee | null {
    this.employeeService
      .getEmployeeById(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (employee) => {
          console.log(employee);
          this.employeeToUpdate = employee;
          this.showUpdateEmployee = true;
          return employee;
        },
        error: (err) => {
          this.toastService.addNewToast({
            message: message.EmployeeLoadingFailMessage,
            classname: 'bg-danger text-light',
          });
          console.error(err);
          this.employeeToUpdate = null;
        },
      });
    return null;
  }

  deleteEmployee(id: string) {
    this.employeeService
      .deleteEmployeeById(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
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
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
