import { AuthenticationService } from './../shared/authentication/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router,
    public authenticationService: AuthenticationService) { }

  ngOnInit() {
    if (this.authenticationService.isUserAuthenticated()) {
      this.goToUser();
    } else {
      this.goToLogin();
    }
  }

  logout() {
    this.authenticationService.logout();
    this.goToLogin();
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  goToUser() {
    this.router.navigate(['/user']);
  }
}
