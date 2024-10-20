import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RolesComponent } from './components/roles/roles.component';
import { MasterComponent } from "./components/master/master.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { ToastContainerComponent } from "./toast-container/toast-container.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RolesComponent, MasterComponent, NavbarComponent, ToastContainerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angularTutorialEmployeeSystem';
}
