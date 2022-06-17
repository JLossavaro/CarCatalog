import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})



export class LoginComponent implements OnInit {

  token: String = "";

  form = new FormGroup({
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required)
  });
  constructor(private api: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    this.api.login(this.form.get('username')?.value, this.form.get('password')?.value)
      .subscribe((res) => {
        localStorage.setItem('token', res);
        this.form.reset();
        this.router.navigate(['dashboard-admin'])
      }
      )
  }

  loginRedirect() {
    if (this.api.IsLoggedIn()) {
      this.router.navigate(['dashboard-admin'])
    }
    return true;
  }




}
