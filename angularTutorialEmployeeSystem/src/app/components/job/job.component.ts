import { Component, OnInit } from '@angular/core';
import { JobsService } from '../../services/jobs.service';
import { Job } from '../../model/Job';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-job',
  standalone: true,
  imports: [NgbCollapseModule],
  templateUrl: './job.component.html',
  styleUrl: './job.component.scss',
})
export class JobComponent implements OnInit {
  constructor(private jobsService: JobsService) {}

  jobList: Job[] = [];
  isLoading: boolean = false;
  isCollapsed: boolean[] = [];

  ngOnInit(): void {
    this.isLoading = true
    this.jobsService.getAllJobs().subscribe({
      next: (res) => {
        this.jobList = res;
        this.isLoading = false;
        this.isCollapsed = new Array<boolean>(this.jobList.length).fill(true)
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      }
    });
  }
}
