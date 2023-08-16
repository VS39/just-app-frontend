import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-icon-message-pop-up',
  templateUrl: './icon-message-pop-up.component.html',
  styleUrls: ['./icon-message-pop-up.component.css'],
})
export class IconMessagePopUpComponent {
  constructor(
    public dialogRef: MatDialogRef<IconMessagePopUpComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  onOkCLick(){
    this.dialogRef.close("Yes");
  }
}
