import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-redeem-pts',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './redeem-pts.component.html',
  styleUrl: './redeem-pts.component.css',
})
export class RedeemPtsComponent {

  discountedAmount: number = 0;
  payload: any = {
    phone: '',
    amount: '',
    points: ''
  };

  constructor(private http: HttpClient) {}

  redeemPoints() {
    this.http.post('https://loyalty-backend-209074976382.europe-west1.run.app/api/Redemption', this.payload).subscribe({
      next: (response: any) => {
        this.discountedAmount = response.discountedAmount;
      },
      error: (err) => {
        alert('Error: ' + err.error.message);
      }
    });
  }

}
