import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { ToastContainerComponent } from './components/toast-container/toast-container.component';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, NavbarComponent, ToastContainerComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    standalone: true
})
export class AppComponent {
  title = 'Tech employee info hub';
}
