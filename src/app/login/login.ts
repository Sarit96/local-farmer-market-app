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
    this.http.post('http://localhost:5000/api/users/login', this.credentials).subscribe(
      response => {
        console.log('User logged in:', response);
        this.loginMessage = 'Login successful!';
        this.router.navigate(['/home']);
      },
      error => {
        console.error('Login error:', error);
        this.loginMessage = 'Login failed. Please try again.';
      }
    );
  }
} 