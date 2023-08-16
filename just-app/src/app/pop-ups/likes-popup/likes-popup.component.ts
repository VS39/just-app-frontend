import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  faImage,
  faChevronCircleDown,
  faChevronCircleUp,
} from '@fortawesome/free-solid-svg-icons';
import { PostService } from 'src/app/services/post.service';
import { AddPostComponent } from '../add-post/add-post.component';
import { UserService } from 'src/app/services/user.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-likes-popup',
  templateUrl: './likes-popup.component.html',
  styleUrls: ['./likes-popup.component.css'],
})
export class LikesPopupComponent {
  
  profileData: any;
  private dataSubject = new Subject<any>();
  // Define an observable to be subscribed by the calling component
  data$ = this.dataSubject.asObservable();

  constructor(
    private userService: UserService,
    public dialogRef: MatDialogRef<AddPostComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.getUserDetails();
  }

  getUserDetails() {
    const userIds = this.data.likes.users.map((user: any) => user._id);
    let filter = {
      id: userIds,
    };
    this.userService.getUserDetails(filter).subscribe((data: any) => {
      if (data != null) {
        if (data.Success) {
          this.profileData = data.Data;
        }
      }
    });
  }

  followActionUser(data: any) {
    if (data) {
      this.sendData('Refresh');
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
