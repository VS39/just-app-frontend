import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-profile-image-expand',
  templateUrl: './profile-image-expand.component.html',
  styleUrls: ['./profile-image-expand.component.css'],
})
export class ProfileImageExpandComponent {
  post: any;

  constructor(
    public dialogRef: MatDialogRef<ProfileImageExpandComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.post = data;
    console.log(this.post);
  }

  close() {
    this.dialogRef.close();
  }
}
