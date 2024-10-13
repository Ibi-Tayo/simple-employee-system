import { Component, OnInit } from '@angular/core';
import { DesignationService } from '../../services/designation.service';
import { Designation } from '../../model/Role';

@Component({
  selector: 'app-designation',
  standalone: true,
  imports: [],
  templateUrl: './designation.component.html',
  styleUrl: './designation.component.scss',
})
export class DesignationComponent implements OnInit {
  constructor(private designationService: DesignationService) {}

  designationList: Designation[] = [];

  ngOnInit(): void {
    this.designationService.getAllDesignation().subscribe({
      next: (res) => {
        this.designationList = res.data;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
