import { Router } from '@angular/router';
import { AuthenticationService } from './../shared/authentication/authentication.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private authenticationService: AuthenticationService,
    private router: Router) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      'username': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required)
    });
  }

  login() {
    if (this.loginForm.valid) {
      const username = this.loginForm.controls['username'].value;
      const password = this.loginForm.controls['password'].value;
      this.authenticationService.authenticate(username, password).subscribe(() => {
        this.goToUsers();
      });
    }
  }

  goToUsers() {
    this.router.navigate(['/user']);
  }
}
