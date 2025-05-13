import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
})
export class LoginPageComponent {
  isLogin: boolean = true;
  
  userRegistrationObject: any = {
    pharmacyName: '',
    password: '',
    email: '',
  };

  userLogin: any = {
    pharmacyName: '',
    password: '',
  };

  router = inject(Router);
  constructor(private authService: AuthService) {};

  registerPharmacy() {
    this.authService.register(this.userRegistrationObject).subscribe({
      next: (response) => {
        console.log('Registration Success:', response);
        localStorage.setItem('pharmacy_id', response.pharmacy_id);
        this.router.navigateByUrl('dashboard');
      },
      error: (error) => {
        console.error('Registration Failed:', error);
        alert('Registration Failed');
      },
    });
  }

  loginPharmacy() {
    this.authService.login(this.userLogin).subscribe({
      next: (response) => {
        console.log('Login Success:', response);
        localStorage.setItem('token', response.token);
        localStorage.setItem('pharmacy_id', response.pharmacy_id);
        this.router.navigateByUrl('dashboard');
      },
      error: (error) => {
        console.error('Login Failed:', error);
        alert('incorrect username or password');
      },
    });
  }

}
