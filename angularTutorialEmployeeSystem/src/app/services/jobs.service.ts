import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Job } from '../model/Job';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JobsService {
  constructor(private http: HttpClient) {}

  jobRequestUrl: string = `${environment.apiUrl}/jobs`;

  getAllJobs(): Observable<Job[]> {
    return this.http.get<Job[]>(this.jobRequestUrl);
  }
}
