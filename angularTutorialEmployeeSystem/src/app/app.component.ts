import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RolesComponent } from './components/roles/roles.component';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { ToastContainerComponent } from './components/toast-container/toast-container.component';
import { JobComponent } from './components/job/job.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RolesComponent, JobComponent, NavbarComponent, ToastContainerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Tech employee info hub';
}
