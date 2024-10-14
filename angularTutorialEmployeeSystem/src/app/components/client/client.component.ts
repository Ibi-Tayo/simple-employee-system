import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { ClientService } from '../../services/client.service';
import { Client } from '../../model/Client';

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './client.component.html',
  styleUrl: './client.component.scss',
})
export class ClientComponent implements OnInit {
  clientForm!: FormGroup;
  allClients: Client[] = [];

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

    this.clientService.getAllClients().subscribe({
      next: (res) => {
        this.allClients = res.data;
      },
      error: (err) => {
        console.error(err)
      },
    });
  }

  onSubmit(): void {
    if(this.clientService.addNewClient(this.clientForm)) {
      alert('success! client has been added');
    } else {
      alert('client was not added');
    }
  }
}
