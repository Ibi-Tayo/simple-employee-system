import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { JobTitle } from '../../model/JobTitle';
import { CompanyTitle } from '../../model/CompanyTitle';
import { Employee } from '../../model/Employee';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.scss',
})
export class EmployeeFormComponent implements OnInit {
  @Output() formSubmit = new EventEmitter<FormGroup>();
  @Input() employeeToUpdate: Employee | null = null;

  employeeForm!: FormGroup;
  jobTitles = Object.values(JobTitle);
  companies = Object.values(CompanyTitle);
  isSubmitted = false;

  constructor(private fb: FormBuilder) {}

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
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['employeeToUpdate'] &&
      changes['employeeToUpdate'].currentValue
    ) {
      this.setFormValues(changes['employeeToUpdate'].currentValue);
    }
  }

  private setFormValues(employee: Employee): void {
    this.employeeForm.patchValue({
      name: employee.name,
      dateOfBirth: employee.dateOfBirth,
      job: employee.job,
      yearsOfExperience: employee.yearsOfExperience,
      company: employee.company,
      salary: employee.salary,
      address: employee.address,
      city: employee.city,
      postcode: employee.postcode,
    });
  }

  formSubmitter(): void {
    this.isSubmitted = true;
    if (this.employeeForm.valid) {
      this.formSubmit.emit(this.employeeForm);
      this.isSubmitted = false;
      this.employeeForm.reset();
      this.employeeToUpdate = null;
    }
  }
}
