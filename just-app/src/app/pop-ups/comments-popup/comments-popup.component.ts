import { AfterViewChecked, Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-comments-popup',
  templateUrl: './comments-popup.component.html',
  styleUrls: ['./comments-popup.component.css'],
})
export class CommentsPopupComponent implements AfterViewChecked {
  profileData: any;
  private dataSubject = new Subject<any>();
  // Define an observable to be subscribed by the calling component
  data$ = this.dataSubject.asObservable();
  updateData!: (postDataPrev: any, message?: any) => void;
  postDataPrev: any;

  constructor(
    private userService: UserService,
    public dialogRef: MatDialogRef<CommentsPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.updateData = data.updateData;
    this.postDataPrev = data.postImage._value;
  }

  ngOnInit() {
  }

  ngAfterViewChecked() {
    if (this.data.postImage._value.userData.comments.commentsCount == 0) {
      this.dialogRef.close();
    }
  }

  followActionUser(data: any) {
    if (data) {
      this.updateData(this.postDataPrev, 'Refresh');
    }
  }

  // Method to emit the data
  sendData(data: any) {
    this.dataSubject.next(data);
  }

  close() {
    this.dialogRef.close();
  }
}
