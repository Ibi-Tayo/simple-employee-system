import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Job } from '../model/Job';

@Injectable({
  providedIn: 'root'
})
export class JobsService {
  constructor(private http: HttpClient) {}

  jobRequestUrl: string = '/jobs';

  getAllJobs(): Observable<Job[]> {
    return this.http.get<Job[]>(this.jobRequestUrl);
  }
}
