import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {
  submitted: boolean = false;

  signupForm = new FormGroup({
    Email: new FormControl('', [Validators.required, Validators.email]),
    Name: new FormControl('', [Validators.required]),
    Username: new FormControl('', [Validators.required]),
    Password: new FormControl('', [Validators.required]),
  });

  constructor(private router: Router, private userService: UserService) {}

  signup() {
    this.submitted = true;

    if (this.signupForm.valid) {
      let filter = {
        name: this.signupForm.controls.Name.value,
        email: this.signupForm.controls.Email.value,
        password: this.signupForm.controls.Password.value,
        username: this.signupForm.controls.Username.value,
      };

      this.userService.signUp(filter).subscribe((data: any) => {
        console.log(data);
        if (data != null) {
          if (data.Success) {
            this.router.navigate(['home']);
          }
        }
      });
    }
  }

  login() {
    this.router.navigate(['login']);
  }

  getEmailErrorMessage() {
    if (this.signupForm.controls.Email.hasError('required')) {
      return 'Please enter email.';
    }

    return this.signupForm.controls.Email.hasError('email')
      ? 'Please enter a valid email.'
      : '';
  }
}
