import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { MaterialModule } from './material-module';

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
    <button class="logout-btn" mat-raised-button color="primary" (click)="logout()">Logout</button>
    <div class="home-container">
      <h1>Welcome to Farmer Market</h1>
    </div>
  `,
  styles: [`
    .logout-btn {
      position: absolute;
      top: 24px;
      right: 32px;
      z-index: 10;
      padding: 4px 16px;
      min-width: unset;
    }
    .home-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 120px;
    }
    h1 {
      margin-bottom: 30px;
    }
  `],
  imports: [RouterModule, MaterialModule]
})
export class HomeComponent {
  constructor(private router: Router) {}

  logout() {
    // Clear session/auth state here if needed
    this.router.navigate(['/login']);
  }
} 