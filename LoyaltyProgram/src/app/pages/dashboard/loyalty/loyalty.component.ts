import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-loyalty',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './loyalty.component.html',
  styleUrl: './loyalty.component.css',
})
export class LoyaltyComponent {
  customerObject: any = {
    firstName: '',
    lastName: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    pharmacy_id: localStorage.getItem('pharmacy_id'),
  };

  constructor(private http: HttpClient) {}

  createCustomer() {
    this.http
      .post('https://loyalty-backend-209074976382.europe-west1.run.app/api/Customer', this.customerObject)
      .subscribe({
        next: (response) => {
          console.log('Customer created successfully:', response);
          alert('Customer successfully created!');
        },
        error: (error) => {
          console.error('Error creating customer:', error);
          alert('Failed to create customer.');
        },
      });
  }
}
