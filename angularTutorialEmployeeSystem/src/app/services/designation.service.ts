import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse, Designation } from '../model/Role';

@Injectable({
  providedIn: 'root'
})
export class DesignationService {
  constructor(private http: HttpClient) {}

  designationRequestUrl: string = 'api/ClientStrive/GetAllDesignation';

  getAllDesignation(): Observable<ApiResponse<Designation[]>> {
    return this.http.get<ApiResponse<Designation[]>>(this.designationRequestUrl);
  }
}
