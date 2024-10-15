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
  deleteUrl: string = '/api/ClientStrive/DeleteClientByClientId';

  constructor(private http: HttpClient) {}

  addNewClient(clientForm: FormGroup): Observable<ApiResponse<null>> | null {
    if (clientForm.valid) {
      const clientData: Client = clientForm.value;
      return this.http.post<ApiResponse<null>>(this.postUrl, clientData);
    } else {
      return null
    }
  }

  getAllClients(): Observable<ApiResponse<Client[]>> {
    return this.http.get<ApiResponse<Client[]>>(this.getUrl);
  }

  deleteClientById(id: number): Observable<ApiResponse<null>> {
   return this.http.delete<ApiResponse<null>>(this.deleteUrl, { params: { clientId: id } });
  }
}
