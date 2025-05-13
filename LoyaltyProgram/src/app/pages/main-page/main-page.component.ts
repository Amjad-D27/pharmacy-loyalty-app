import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {

  constructor(private router: Router) { }

  onLoginClick() {
    this.router.navigateByUrl('/login-page');
  }

}
