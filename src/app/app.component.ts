import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'jamboree';
    
  constructor(private authService: AuthService, private router: Router) { }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  logoff() {
    this.authService.logout();
    this.router.navigateByUrl("/login");
  }
}
