import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-apply-pts',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './apply-pts.component.html',
  styleUrl: './apply-pts.component.css',
})
export class ApplyPtsComponent {

  pointsEarned: number = 0;
  payload: any = {
    phone: '',
    amount: ''
  };

  constructor(private http: HttpClient) {}

  applyPoints() {  
    this.http.post('http://localhost:8080/api/Transaction', this.payload).subscribe({
      next: (res: any) => {
        this.pointsEarned = res.pointsEarned;
      },
      error: (err) => {
        alert('Failed to apply points: ' + err.error.message);
      }
    });
  }

}
