import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonService } from 'src/app/services/common.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css'],
})
export class UpdateUserComponent {
  usernameValue: any;
  existingUsername: boolean = false;

  form = new FormGroup({
    Name: new FormControl(''),
    Username: new FormControl(''),
    Bio: new FormControl(''),
    Website: new FormControl(''),
  });

  constructor(
    private userService: UserService,
    private commonService: CommonService,
    public dialogRef: MatDialogRef<UpdateUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log(data);
    this.form.controls.Name.setValue(data.name);
    this.form.controls.Username.setValue(data.username);
    this.form.controls.Bio.setValue(data.bio);
    this.form.controls.Website.setValue(data.website);
  }

  close() {
    this.dialogRef.close();
  }

  checkExistingUser() {
    this.usernameValue = this.form.controls.Username.value;
    if (this.usernameValue != this.data.username) {
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
  }

  save() {
    this.checkExistingUser();
    if (!this.existingUsername) {
      let filter = {
        name: this.form.controls.Name.value,
        username: this.form.controls.Username.value,
        bio: this.form.controls.Bio.value,
        website: this.form.controls.Website.value,
      };

      this.userService
        .updateUser(filter, this.data.id)
        .subscribe((data: any) => {
          if (data != null) {
            if (data.Success) {
              // this.commonService.openIconMessagePopUp(
              //   'fa fa-check-circle-o',
              //   'You have successfully updated your profile.',
              //   '',
              //   // 'Click ok to continue.'
              // );
              localStorage.setItem('userName', data.Data.username);
              this.dialogRef.close(data.Data.username);
            } else {
            }
          }
        });
    }
  }
}
