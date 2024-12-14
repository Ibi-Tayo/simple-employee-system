import {
  Component,
  computed,
  DestroyRef,
  effect,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Employee } from '../../model/Employee';
import { EmployeeService } from '../../services/employee.service';
import { NgbAlertModule, NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from '../../services/toast.service';
import { message } from '../../model/Message';
import { EmployeeFormComponent } from '../employee-form/employee-form.component';
import { CommonModule } from '@angular/common';
import { catchError, EMPTY, map } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
export class EmployeeComponent implements OnInit {
  private employeeService = inject(EmployeeService);
  private toastService = inject(ToastService);
  private destroyRef = inject(DestroyRef);

  // Signals for state management
  protected allEmployees = signal<Employee[]>([]);
  protected paginatedEmployees = signal<Employee[]>([]);
  protected currentPageNumber = signal<number>(1);
  protected employeesPerPage = signal<number>(6);
  protected employeeIdToDelete = signal<string>('');
  protected employeeIdToUpdate = signal<string>('');
  protected employeeToUpdate = signal<Employee | null>(null);
  protected showUpdateEmployee = signal<boolean>(false);

  // Computed signals
  protected totalPages = computed(() =>
    Math.ceil(this.allEmployees().length / this.employeesPerPage())
  );

  constructor() {
    // Effect for loading employees when page or size changes
    effect(() => {
      this.loadPaginatedEmployees(
        this.currentPageNumber(),
        this.employeesPerPage()
      );
    });
  }
  ngOnInit(): void {
    this.loadAllEmployees();
  }

  private loadAllEmployees() {
    this.employeeService
      .getAllEmployees()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        catchError((err) => {
          this.toastService.addNewToast({
            message: message.EmployeeLoadingFailMessage,
            classname: 'bg-danger text-light',
          });
          return EMPTY;
        })
      )
      .subscribe((employees) => {
        this.allEmployees.set(employees);
      });
  }

  private loadPaginatedEmployees(
    currentPageNo: number,
    employeesPerPage: number
  ) {
    this.employeeService
      .getPaginatedEmployees(currentPageNo, employeesPerPage)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        catchError((err) => {
          this.toastService.addNewToast({
            message: message.EmployeeLoadingFailMessage,
            classname: 'bg-danger text-light',
          });
          return EMPTY;
        })
      )
      .subscribe((employees) => {
        this.paginatedEmployees.set(employees);
      });
  }

  protected setPage(pageNumber: number) {
    this.currentPageNumber.set(pageNumber);
  }

  protected setEmployeesPerPage(count: number) {
    this.employeesPerPage.set(count);
  }

  protected addEmployee(employeeForm: FormGroup): void {
    this.employeeService
      .addNewEmployee(employeeForm)
      ?.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          if (res) {
            this.toastService.addNewToast({
              message: message.EmployeeAdditionSuccessMessage(
                employeeForm.value['name'] // TODO: This shows null instead of name
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

  protected updateEmployee(employeeForm: FormGroup, id: string) {
    const employeeName: string = employeeForm.get('name')?.value;
    this.employeeService
      .updateEmployee(employeeForm, id)
      ?.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          if (res) {
            this.toastService.addNewToast({
              message: message.EmployeeUpdateSuccessMessage(employeeName),
              classname: 'bg-success text-light',
            });
            this.loadAllEmployees();
            this.showUpdateEmployee.set(false);
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

  protected getEmployeeByIdForUpdate(id: string) {
    this.employeeService
      .getEmployeeById(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (employee) => {
          this.toastService.addNewToast({
            message: message.EmployeeFoundSuccessMessage,
            classname: 'bg-success text-light',
          });
          this.employeeToUpdate.set(employee);
          this.showUpdateEmployee.set(true);
        },
        error: (err) => {
          this.toastService.addNewToast({
            message: message.EmployeeNotFoundFailMessage,
            classname: 'bg-danger text-light',
          });
          console.error(err);
          this.employeeToUpdate.set(null);
        },
      });
  }

  protected deleteEmployee(id: string) {
    this.employeeService
      .deleteEmployeeById(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          if (res) {
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
