import { Injectable } from '@angular/core';
import { Client } from '../model/Client';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../model/Role';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  postUrl: string = '/api/ClientStrive/AddUpdateClient';
  getUrl: string = '/api/ClientStrive/GetAllClients';

  constructor(private http: HttpClient) {}

  addNewClient(clientForm: FormGroup): boolean {
    if (clientForm.valid) {
      const clientData: Client = clientForm.value;
      this.http.post(this.postUrl, clientData).subscribe({
        next: (res) => {
          console.log(res);
          return true;
        },
        error: (err) => {
          console.error(err);
          return false;
        },
      });
    }
    return false;
  }

  getAllClients(): Observable<ApiResponse<Client[]>> {
    return this.http.get<ApiResponse<Client[]>>(this.getUrl);
  }
}
