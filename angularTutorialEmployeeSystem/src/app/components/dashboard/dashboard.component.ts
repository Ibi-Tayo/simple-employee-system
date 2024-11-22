import { Component, inject, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { Colors } from 'chart.js';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../model/Employee';
import {
  calculateAgeDistribution,
  calculateBasicDistribution,
  calculateSalaryDistribution,
  GraphData,
} from '../../scripts/data-aggregation';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  private employeeService = inject(EmployeeService);
  employees: Employee[] = [];

  companyDistributionChart:
    | Chart<'polarArea', number[], string | number | Date>
    | undefined;
  jobDistributionChart:
    | Chart<'bar', number[], string | number | Date>
    | undefined;
  ageDistributionChart:
    | Chart<'pie', number[], string | number | Date>
    | undefined;
  salaryDistributionChart:
    | Chart<'doughnut', number[], string | number | Date>
    | undefined;

  companyDistrData: GraphData = { labels: [], rawData: [] };
  jobDistrData: GraphData = { labels: [], rawData: [] };
  ageDistrData: GraphData = { labels: [], rawData: [] };
  salaryDistrData: GraphData = { labels: [], rawData: [] };

  ngOnInit() {
    //Chart.register(Colors);
    this.employeeService.getAllEmployees().subscribe({
      next: (res) => {
        this.employees = res;
        this.initializeCompanyChart();
        this.initializeJobChart();
        this.initializeAgeChart();
        this.initializeSalaryChart();
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  initializeCompanyChart() {
    this.companyDistrData = calculateBasicDistribution(
      this.employees,
      'company'
    );
    let data = {
      labels: this.companyDistrData.labels,
      datasets: [
        {
          label: 'Company Distribution',
          data: this.companyDistrData.rawData,
          hoverOffset: 4,
        },
      ],
    };
    this.companyDistributionChart = new Chart('companyDistribution', {
      type: 'polarArea',
      data: data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Distribution of employees per company',
            font: {
              size: 20,
            },
            color: 'white',
          },
        },
      },
    });
  }

  initializeJobChart() {
    this.jobDistrData = calculateBasicDistribution(this.employees, 'job');
    let data = {
      labels: this.jobDistrData.labels,
      datasets: [
        {
          label: 'Job Distribution',
          data: this.jobDistrData.rawData,
          hoverOffset: 4,
        },
      ],
    };
    this.jobDistributionChart = new Chart('jobDistribution', {
      type: 'bar',
      data: data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Distribution of employees per job title',
            font: {
              size: 20,
            },
            color: 'white',
          },
        },
      },
    });
  }

  initializeAgeChart() {
    this.ageDistrData = calculateAgeDistribution(this.employees);
    let data = {
      labels: this.ageDistrData.labels,
      datasets: [
        {
          label: 'Age Distribution',
          data: this.ageDistrData.rawData,
          hoverOffset: 4,
        },
      ],
    };
    this.ageDistributionChart = new Chart('ageDistribution', {
      type: 'pie',
      data: data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Distribution of age across all employees',
            font: {
              size: 20,
            },
            color: 'white',
          },
        },
      },
    });
  }

  initializeSalaryChart() {
    this.salaryDistrData = calculateSalaryDistribution(this.employees);
    let data = {
      labels: this.salaryDistrData.labels,
      datasets: [
        {
          label: 'Salary Distribution',
          data: this.salaryDistrData.rawData,
          hoverOffset: 4,
        },
      ],
    };
    this.salaryDistributionChart = new Chart('salaryDistribution', {
      type: 'doughnut',
      data: data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Distribution of salary across all employees',
            font: {
              size: 20,
            },
            color: 'white',
          },
        },
      },
    });
  }
}
