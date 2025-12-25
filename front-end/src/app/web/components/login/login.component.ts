import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Observable, of, Subscription } from 'rxjs';
import { LoginService } from '../../services/login.service';
import { provideToastr, ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [
   
  ]
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  subscribe = new Subscription();

  constructor(private fb: FormBuilder, private loginService: LoginService,private toastr: ToastrService,private route:Router) {}

  ngOnInit(): void {
    this.createForm();
  }
  createForm() {
    this.form = this.fb.group({
      email: ['', Validators.required, this.emailAsyncValidator.bind(this)],
      password: [
        '',
        Validators.required,
        this.passwordAsyncValidator.bind(this),
      ],
    });
  }

  // Async email validator example
  emailAsyncValidator(
    control: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    const email = control.value;
    // Simulate async check (e.g., server call)
    const regx = new RegExp('^[a-zA-Z0-9]+@[a-zA-Z]+\\.[a-zA-Z]{2,}$');
    if (!regx.test(email)) {
      return of({ invalidEmail: true });
    }
    return of(null);
  }

  passwordAsyncValidator(
    control: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    const password = control.value;
    // Simulate async check (e.g., server call)
    const regx = new RegExp(
      '^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$'
    );
    if (!regx.test(password)) {
      return of({ invalidPassword: true });
    }
    return of(null);
  }

  login() {
    if (this.form.valid) {
      this.subscribe.add(
        this.loginService
          .getLoginDetails(this.form.value)
          .subscribe({
            next:(resp)=>{
              this.toastr.success(resp.message, 'Success!');
              localStorage.setItem('token',resp.data.token);
              localStorage.setItem('loginData',JSON.stringify(resp.data.details[0]));
              this.route.navigateByUrl('/user/home')
            },error:(err:HttpErrorResponse)=>{
              this.toastr.error(err.error.message, 'Error!');
            },
          })
      );
    }
  }
}
