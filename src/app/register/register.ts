import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // Import FormsModule for template-driven forms
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.html',
  styleUrls: ['./register.component.scss'],
  imports: [FormsModule, CommonModule]
})
export class RegisterComponent {
  user = {
    username: '',
    email: '',
    password: ''
  };

  constructor(private http: HttpClient) { }

  register() {
    this.http.post('http://localhost:5000/api/users/register', this.user).subscribe(
      response => {
        console.log('User registered:', response);
      },
      error => {
        console.error('Registration error:', error);
      }
    );
  }
}
