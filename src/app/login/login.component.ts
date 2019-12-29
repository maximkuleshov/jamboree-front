import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginPageComponent {

  public loginForm: FormGroup;
  public invalidLogin: boolean = false;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.authService.logout();

    this.loginForm = this.formBuilder.group({
      login: ['', Validators.compose([Validators.required])],
      password: ['', Validators.required]
    });
  }

  tryLogin() {
    if (this.loginForm.invalid) {
      return;
    }

    const authRequest = {
      login: this.loginForm.controls.login.value,
      password: this.loginForm.controls.password.value
    }

    this.authService.login(authRequest).subscribe(r => {
        this.authService.rememberUser(r);
        this.router.navigateByUrl('/events');
      },
      r => {
        this.invalidLogin = true; 
        alert("Login failed"); 
      } 
    );
  }

}
