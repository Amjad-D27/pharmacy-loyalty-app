//import { CommonModule } from '@angular/common';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent {
  username = '';
  password = '';
  loginFailed = false;

  constructor(private router: Router) {}

  onLogin() {
    if (this.username === 'admin' && this.password === 'adminpa55') {
      localStorage.setItem('isAdminAuthenticated', 'true');
      this.router.navigateByUrl('admin');
    } else {
      this.loginFailed = true;
    }
  }
}
