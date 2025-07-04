import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // Import FormsModule for template-driven forms
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material-module';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.html',
  styleUrls: ['./register.component.scss'],
  imports: [FormsModule, CommonModule, MaterialModule, RouterModule]
})
export class RegisterComponent {
  user = {
    username: '',
    email: '',
    password: ''
  };

  registrationMessage: string = '';

  constructor(private http: HttpClient) { }

  register() {
    this.http.post('http://localhost:5000/api/users/register', this.user).subscribe(
      response => {
        console.log('User registered:', response);
        this.registrationMessage = 'Registration successful!';
      },
      error => {
        console.error('Registration error:', error);
        this.registrationMessage = 'Registration failed. Please try again.';
      }
    );
  }
}
