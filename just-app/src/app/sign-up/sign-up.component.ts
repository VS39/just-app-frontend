import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { CommonService } from '../services/common.service';
import { AuthService } from '../authentication/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {
  submitted: boolean = false;
  existingUsername: boolean = false;
  showPassword: boolean = false;

  form = new FormGroup({
    Email: new FormControl('', [
      Validators.required,
      Validators.pattern(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      ),
    ]),
    Name: new FormControl('', [Validators.required]),
    Username: new FormControl('', [Validators.required]),
    Password: new FormControl('', [Validators.required]),
  });

  constructor(
    private router: Router,
    private userService: UserService,
    private authService: AuthService,
    private commonService: CommonService
  ) {}

  checkExistingUser() {
    let filter = {
      username: this.form.controls.Username.value,
    };

    this.userService.checkExistingUser(filter).subscribe((data: any) => {
      if (data != null) {
        if (data.Success) {
          this.existingUsername = false;
        } else {
          this.existingUsername = true;
        }
      }
    });
  }

  eyeIconClick() {
    this.showPassword = !this.showPassword;
  }

  logIn() {
    this.router.navigate(['login']);
  }

  getEmailErrorMessage() {
    if (this.form.controls.Email.hasError('required')) {
      return 'Please enter email.';
    }

    return this.form.controls.Email.errors?.['pattern']
      ? 'Please enter a valid email.'
      : '';
  }

  getUsernameErrorMessage() {
    if (this.existingUsername) {
      return 'Username already exists.';
    }

    return this.form.controls.Username.hasError('required')
      ? 'Please enter username.'
      : '';
  }

  signUp() {
    this.submitted = true;
    
    if (this.form.valid && !this.existingUsername) {
      let filter = {
        name: this.form.controls.Name.value,
        email: this.form.controls.Email.value,
        password: this.commonService.encrypt(this.form.controls.Password.value),
        username: this.form.controls.Username.value,
      };

      this.authService.signUp(filter).subscribe((data: any) => {
        if (data != null) {
          if (data.Success) {
            this.commonService.openIconMessagePopUp(
              'fa fa-check-circle-o',
              'You have successfully signed up.',
              '',
              'Login to upload your first post.'
            );
            this.router.navigate(['login']);
          }
        }
      });
    }
  }
}
