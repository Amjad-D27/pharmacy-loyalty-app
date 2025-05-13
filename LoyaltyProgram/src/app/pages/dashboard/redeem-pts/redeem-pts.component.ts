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
    this.http.post('http://localhost:8080/api/Redemption', this.payload).subscribe({
      next: (response: any) => {
        this.discountedAmount = response.discountedAmount;
      },
      error: (err) => {
        alert('Error: ' + err.error.message);
      }
    });
  }

}
