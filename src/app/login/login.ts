import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material-module';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.html',
  styleUrls: ['./login.component.scss'],
  imports: [FormsModule, CommonModule, MaterialModule, RouterModule]
})
export class LoginComponent {
  credentials = {
    email: '',
    password: ''
  };

  loginMessage: string = '';

  constructor(private http: HttpClient, private router: Router) { }

  login() {
    this.http.post<any>('http://localhost:5000/api/users/login', this.credentials).subscribe(
      response => {
        console.log('User logged in:', response);
        this.loginMessage = 'Login successful!';
        if (response.role === 'farmer') {
          localStorage.setItem('farmerId', response.userId);
          this.router.navigate(['/farmer-dashboard']);
        } else if (response.role === 'customer') {
          this.router.navigate(['/marketplace']);
        } else {
          this.router.navigate(['/home']);
        }
      },
      error => {
        console.error('Login error:', error);
        if (error.status === 404) {
          this.loginMessage = 'User not found. Please register.';
        } else if (error.status === 401) {
          this.loginMessage = 'Invalid credentials. Please try again or register.';
        } else {
          this.loginMessage = 'Login failed. Please try again.';
        }
      }
    );
  }
} 