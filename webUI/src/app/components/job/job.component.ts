import { Component, DestroyRef, OnInit } from '@angular/core';
import { JobsService } from '../../services/jobs.service';
import { Job } from '../../model/Job';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { catchError, EMPTY, map, Observable, switchMap, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-job',
    imports: [NgbCollapseModule, CommonModule],
    templateUrl: './job.component.html',
    styleUrl: './job.component.scss',
    standalone: true,
})
export class JobComponent implements OnInit {
  constructor(private jobsService: JobsService, private destroyRef: DestroyRef) {}

  jobList$: Observable<Job[]> = EMPTY;
  isLoading: boolean = false;
  isCollapsed: boolean[] = [];

  ngOnInit(): void {
    this.isLoading = true
    this.jobList$ = this.jobsService.getAllJobs().pipe(
      takeUntilDestroyed(this.destroyRef),
      tap((jobs) => {
        this.isLoading = false;
        this.isCollapsed = jobs.map(() => true)
      }),
      catchError((err) => {
        console.error(err);
        this.isLoading = false;
        return EMPTY;
      })
    )
  }
}
