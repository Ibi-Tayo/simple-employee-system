import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Role } from '../model/Role';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RolesService {
  constructor(private http: HttpClient) {}

  rolesRequestUrl: string = `${environment.apiUrl}/roles`;

  getAllRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(this.rolesRequestUrl);
  }
}


