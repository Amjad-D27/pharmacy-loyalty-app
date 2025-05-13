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
      .post('http://localhost:8080/api/Customer', this.customerObject)
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
