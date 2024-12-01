import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RolesService } from '../../services/roles.service';
import { Role } from '../../model/Role';

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.scss',
})
export class RolesComponent implements OnInit {
  constructor(private rolesService: RolesService) {}

  rolesList: Role[] = [];

  ngOnInit(): void {
    this.rolesService.getAllRoles().subscribe({
      next: (response) => {
        this.rolesList = response;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
