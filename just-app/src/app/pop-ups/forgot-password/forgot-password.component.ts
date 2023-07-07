import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router, } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent {
  submitted: boolean = false;
  errorMessage: any = '';
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;


  form = new FormGroup({
    Username: new FormControl('', [Validators.required]),
    Password: new FormControl('', [Validators.required]),
    ConfirmPassword: new FormControl('', [Validators.required]),
  });

  constructor(
    private userService: UserService,
    private router: Router,
    private commonService: CommonService,
    public dialogRef: MatDialogRef<ForgotPasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  eyeIconClick() {
    this.showPassword = !this.showPassword;
  }

  eyeIconClickConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  cancel() {
    this.submitted = false;
    this.dialogRef.close();
  }

  resetPassword() {
    this.submitted = true;
    this.errorMessage = '';
    if (
      this.form.valid &&
      this.form.controls.Password.value !=
        this.form.controls.ConfirmPassword.value
    ) {
      this.errorMessage = 'Passwords not matching.';
      return;
    }
    if (
      this.form.valid &&
      this.form.controls.Password.value ==
        this.form.controls.ConfirmPassword.value
    ) {
      let filter = {
        username: this.form.controls.Username.value,
        password: this.commonService.encrypt(this.form.controls.Password.value),
      };

      this.userService.resetPassword(filter).subscribe((data: any) => {
        if (data != null) {
          if (data.Success) {
            this.errorMessage = '';
            this.commonService.openIconMessagePopUp(
              'fa fa-check-circle-o',
              'Password changed successfully.',
              '',
              'Login to upload your first post.',true
            );
            this.router.navigate(['login']);
            // window.location.reload();
          } else {
            this.errorMessage = data.message;
          }
        }
      });
    }
  }
}
