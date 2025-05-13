import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { LoyaltyComponent } from './loyalty/loyalty.component';
import { MembersComponent } from './members/members.component';
import { ApplyPtsComponent } from './apply-pts/apply-pts.component';
import { RedeemPtsComponent } from './redeem-pts/redeem-pts.component';
import { AdminComponent } from './admin/admin.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    RouterOutlet,
    LoyaltyComponent,
    MembersComponent,
    ApplyPtsComponent,
    RedeemPtsComponent,
    AdminComponent,
    AdminLoginComponent,
    CommonModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  Loyalty: boolean = false;
  Members: boolean = false;
  applyPts: boolean = false;
  redeemPts: boolean = false;
  admin: boolean = false;
  menuVisible: boolean = false;

  constructor(private router: Router) {}

  toggleMenu() {
  this.menuVisible = !this.menuVisible;
  }

  onLoyaltyClick() {
    this.Loyalty = true;
    this.Members = false;
    this.applyPts = false;
    this.redeemPts = false;
    this.admin = false;
    this.toggleMenu();
  }
  onMembersClick() {
    this.Loyalty = false;
    this.Members = true;
    this.applyPts = false;
    this.redeemPts = false;
    this.admin = false;
    this.toggleMenu();
  }
  onApplyClick() {
    this.Loyalty = false;
    this.Members = false;
    this.applyPts = true;
    this.redeemPts = false;
    this.admin = false;
    this.toggleMenu();
  }
  onRedeemClick() {
    this.Loyalty = false;
    this.Members = false;
    this.applyPts = false;
    this.redeemPts = true;
    this.admin = false;
    this.toggleMenu();
  }
  
  onAdminClick() {
    const isAuthenticated = localStorage.getItem('isAdminAuthenticated') === 's';
    if (!isAuthenticated) {
      this.router.navigateByUrl('admin-login');
    } else {
      this.Loyalty = false;
      this.Members = false;
      this.applyPts = false;
      this.redeemPts = false;
      this.admin = true;
    }
  }

  onLogout() {
    localStorage.removeItem('pharmacy_id');
    localStorage.removeItem('token');
    this.router.navigateByUrl('main-page');
  }

}
