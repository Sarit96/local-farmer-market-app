import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register';
import { LoginComponent } from './login/login';
import { HomeComponent } from './home';
import { FarmerDashboardComponent } from './farmer-dashboard/farmer-dashboard';

export const routes: Routes = [
  { path: '', component: RegisterComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'farmer-dashboard', component: FarmerDashboardComponent },
];
