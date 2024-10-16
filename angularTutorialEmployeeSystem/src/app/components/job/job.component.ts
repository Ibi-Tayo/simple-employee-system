import { Component, OnInit } from '@angular/core';
import { JobsService } from '../../services/jobs.service';
import { Job } from '../../model/Job';

@Component({
  selector: 'app-job',
  standalone: true,
  imports: [],
  templateUrl: './job.component.html',
  styleUrl: './job.component.scss',
})
export class JobComponent implements OnInit {
  constructor(private jobsService: JobsService) {}

  jobList: Job[] = [];
  isLoading: boolean = false;

  ngOnInit(): void {
    this.isLoading = true
    this.jobsService.getAllJobs().subscribe({
      next: (res) => {
        this.jobList = res;
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      }
    });
  }
}
