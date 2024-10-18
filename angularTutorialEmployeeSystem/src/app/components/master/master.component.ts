import { Component } from '@angular/core';
import { RolesComponent } from '../roles/roles.component';
import { JobComponent } from '../job/job.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-master',
  standalone: true,
  imports: [RolesComponent, JobComponent, CommonModule],
  templateUrl: './master.component.html',
  styleUrl: './master.component.scss'
})
export class MasterComponent {

  componentName: string = '';

  changeComponent(name: string) {
    this.componentName = name;
  }

}
