import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { JobTitle } from '../../model/JobTitle';
import { Company } from '../../model/Company';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.scss'
})
export class EmployeeFormComponent implements OnInit {
  @Output() formSubmit = new EventEmitter<FormGroup>()

  employeeForm!: FormGroup;
  jobTitles = Object.values(JobTitle);
  companies = Object.values(Company);
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

  formSubmitter(): void {
    this.isSubmitted = true;
    if (this.employeeForm.valid) {
      this.formSubmit.emit(this.employeeForm);
      this.isSubmitted = false;
      this.employeeForm.reset();
    }
  }

}
