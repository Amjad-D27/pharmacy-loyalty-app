import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-members',
  standalone: true,
  imports: [FormsModule, CommonModule],
  providers: [DatePipe],
  templateUrl: './members.component.html',
  styleUrl: './members.component.css',
})
export class MembersComponent {

  showTable: boolean = false;
  showRow: boolean = false;
  searchPhone: string = '';
  loyaltyMember: any = null;
  loyaltyAccount: any[] = [];

  constructor(private http: HttpClient, private dataPipe: DatePipe) {}

  getCustomerByPhone(): void {
    if (!this.searchPhone) {
      alert('Please enter a phone number.');
      return;
    }

    this.http.get<any>(`http://localhost:8080/api/LoyaltyAccount/${this.searchPhone}`).subscribe({
      next: (data) => {
        this.loyaltyMember = data;
        this.showTable = false;
        this.showRow = true;
      },
      error: (err) => {
        console.error('Error fetching customer:', err);
        alert('Customer not found.');
        this.showRow = false;
      }
    });
  }

  getAllCustomers() {
    this.http.get<any[]>('http://localhost:8080/api/LoyaltyAccount/').subscribe({
      next: (data) => {
        this.loyaltyAccount = data;
        this.showRow = false;
        this.showTable = true;
      },
      error: (err) => {
        console.error(err);
        this.showTable = false;
      }
    })
  }

}
