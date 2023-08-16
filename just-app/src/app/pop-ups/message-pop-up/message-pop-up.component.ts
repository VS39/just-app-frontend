import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-message-pop-up',
  templateUrl: './message-pop-up.component.html',
  styleUrls: ['./message-pop-up.component.css'],
})
export class MessagePopUpComponent {
  constructor(
    public dialogRef: MatDialogRef<MessagePopUpComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onOkCLick() {
    this.dialogRef.close('Yes');
  }
}
