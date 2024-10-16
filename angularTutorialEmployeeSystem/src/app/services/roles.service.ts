import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Role } from '../model/Role';

@Injectable({
  providedIn: 'root',
})
export class RolesService {
  constructor(private http: HttpClient) {}

  rolesRequestUrl: string = '/roles';

  getAllRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(this.rolesRequestUrl);
  }
}


