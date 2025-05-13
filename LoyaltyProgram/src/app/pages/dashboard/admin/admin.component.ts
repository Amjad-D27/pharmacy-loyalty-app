import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

  phoneNumber = '';

  constructor(private router: Router, private http: HttpClient) {}

  updatePointsRule(points: number) {
    this.http.put('https://loyalty-backend-209074976382.europe-west1.run.app/api/PointsRule', {pointsPerDollar: points}).subscribe({
      next: () => alert(`Rule updated to ${points} points per dollar`),
      error: (err) => alert(err.error.message)
    });
  }
  
  deleteAccount() {
    const phone = this.phoneNumber;
    this.http.delete(`https://loyalty-backend-209074976382.europe-west1.run.app/api/LoyaltyAccount/${phone}`).subscribe({
        next: (res) => {
          alert('Account deleted successfully');
          this.phoneNumber = '';
        },
        error: (err) => {
          alert(err.error.message);
        }
      });
  }
  
  logoutAdmin() {
    localStorage.removeItem('isAdminAuthenticated');
    this.router.navigateByUrl('dashboard');
  }

}
