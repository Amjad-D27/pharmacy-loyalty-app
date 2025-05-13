import { Routes } from '@angular/router';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoyaltyComponent } from './pages/dashboard/loyalty/loyalty.component';
import { MembersComponent } from './pages/dashboard/members/members.component';
import { ApplyPtsComponent } from './pages/dashboard/apply-pts/apply-pts.component';
import { RedeemPtsComponent } from './pages/dashboard/redeem-pts/redeem-pts.component';
import { AdminComponent } from './pages/dashboard/admin/admin.component';
import { AdminLoginComponent } from './pages/dashboard/admin-login/admin-login.component';
import { authGuard } from './guard/auth.guard';
import { adminAuthGuard } from './adminGuard/admin-auth.guard';
import { AboutUsComponent } from './pages/about-us/about-us.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'main-page',
        pathMatch: 'full'
    },
    {
        path: 'main-page',
        component: MainPageComponent
    },
    {
        path: 'login-page',
        component: LoginPageComponent
    },
    {
        path: 'about-us',
        component: AboutUsComponent
    },
    {
        path: 'admin-login',
        component: AdminLoginComponent
    },
    {
        path: 'admin',
        component: AdminComponent,
        canActivate: [adminAuthGuard]
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [authGuard],
        children: [
            {
                path: 'loyalty',
                component: LoyaltyComponent
            },
            {
                path: 'members',
                component: MembersComponent
            },
            {
                path: 'apply-pts',
                component: ApplyPtsComponent
            },
            {
                path: 'redeem-pts',
                component: RedeemPtsComponent
            },
        ]
    }
    
];
