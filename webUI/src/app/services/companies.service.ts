import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Company } from '../model/Company';

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {
  constructor(private http: HttpClient) {}

  companyRequestUrl: string = `${environment.apiUrl}/companies`;

  getAllCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>(this.companyRequestUrl);
  }
}
