import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Employee } from '../../model/Employee';
import { findBirthdaysThisTimePeriod } from '../../scripts/data-aggregation';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-employee-birthday',
    imports: [CommonModule],
    templateUrl: './employee-birthday.component.html',
    styleUrl: './employee-birthday.component.scss',
    standalone: true,
})
export class EmployeeBirthdayComponent implements OnInit, OnChanges {

  @Input() employees: Employee[] = [];
  birthdayEmployees: Employee[] = [];

  ngOnInit(): void {
    this.updateBirthdayEmployees();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['employees']) {
      this.updateBirthdayEmployees();
    }
  }

  private updateBirthdayEmployees(): void {
    this.birthdayEmployees = findBirthdaysThisTimePeriod(this.employees, 'DAY');
  }
}
