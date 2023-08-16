import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { ForgotPasswordComponent } from '../pop-ups/forgot-password/forgot-password.component';
import { MatDialog } from '@angular/material/dialog';
import { CommonService } from '../services/common.service';
import { AuthService } from '../authentication/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  submitted: boolean = false;
  showPassword: boolean = false;

  form = new FormGroup({
    Username: new FormControl('', [Validators.required]),
    Password: new FormControl('', [Validators.required]),
  });

  constructor(
    private router: Router,
    private commonService: CommonService,
    private authService: AuthService,
    public dialog: MatDialog
  ) {}

  errorMessage: any = '';

  signUp() {
    this.router.navigate(['signup']);
  }

  eyeIconClick() {
    this.showPassword = !this.showPassword;
  }

  forgotPassword() {
    const dialogRef = this.dialog.open(ForgotPasswordComponent, {});
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
      }
    });
  }

  logIn() {
    this.submitted = true;
    this.errorMessage = '';
    if (this.form.valid) {
      this.authService
        .logIn(
          this.form.controls.Username.value,
          this.commonService.encrypt(this.form.controls.Password.value)
        )
        .subscribe((data: any) => {
          if (data != null) {
            if (data.Success) {
              this.errorMessage = '';
              this.router.navigate(['home']);
            } else {
              this.errorMessage = data.message;
            }
          }
        });
    }
  }
}
