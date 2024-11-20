import { Component, inject, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { Colors } from 'chart.js';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../model/Employee';
import {
  calculateBasicDistribution,
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

  companyDistributionPieChart:
    | Chart<'pie', number[], string | number | Date>
    | undefined;
  jobDistributionPieChart:
    | Chart<'pie', number[], string | number | Date>
    | undefined;

  companyDistrData: GraphData = { labels: [], rawData: [] };
  jobDistrData: GraphData = { labels: [], rawData: [] };

  ngOnInit() {
    Chart.register(Colors);
    this.employeeService.getAllEmployees().subscribe({
      next: (res) => {
        this.employees = res;
        this.initializeCompanyPieChart();
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  initializeCompanyPieChart() {
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
    this.companyDistributionPieChart = new Chart('companyDistribution', {
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
            text: 'Distribution of employees per company',
          },
        },
      },
    });
  }

  initializeJobPieChart() {
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
    this.jobDistributionPieChart = new Chart('jobDistribution', {
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
            text: 'Distribution of employees per job title',
          },
        },
      },
    });
  }
}
