import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { ClientService } from '../../services/client.service';
import { Client } from '../../model/Client';

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './client.component.html',
  styleUrl: './client.component.scss',
})
export class ClientComponent implements OnInit {
  clientForm!: FormGroup;
  allClients: Client[] = [];
  clientIdToDelete: number = 0;

  constructor(private fb: FormBuilder, private clientService: ClientService) {}

  ngOnInit(): void {
    this.clientForm = this.fb.group({
      contactPersonName: ['', Validators.required],
      companyName: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      pincode: ['', Validators.required],
      state: ['', Validators.required],
      EmployeeStrength: ['', Validators.required],
      gstNo: ['', Validators.required],
      contactNo: ['', Validators.required],
      regNo: ['', Validators.required],
    });

    this.loadAllClients();
  }

  private loadAllClients() {
    this.clientService.getAllClients().subscribe({
      next: (res) => {
        this.allClients = res.data;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  onSubmit(): void {
    this.clientService.addNewClient(this.clientForm)?.subscribe({
      next: (res) => {
        console.log(res);
        if (res.result) {
          alert('success! client has been added');
          this.loadAllClients();
        } else {
          alert('client was not added');
        }
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  deleteClient(id: number) {
    this.clientService.deleteClientById(id).subscribe({
      next: (res) => {
        if (res.result) {
          console.log(res);
          alert(`client with id: ${id} has been deleted`)
          this.loadAllClients();
        } else {
          alert('client was not deleted for some reason')
        }
      },
      error: (err) => {
        console.error(err);
      }
    })
  }
}
