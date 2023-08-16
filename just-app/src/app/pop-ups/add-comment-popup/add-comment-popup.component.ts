import { DatePipe } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  faImage,
  faChevronCircleDown,
  faChevronCircleUp,
} from '@fortawesome/free-solid-svg-icons';
import { CommonService } from 'src/app/services/common.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-add-comment-popup',
  templateUrl: './add-comment-popup.component.html',
  styleUrls: ['./add-comment-popup.component.css'],
})
export class AddCommentPopupComponent {
  loggedInUserId: any;
  comment: any = '';

  constructor(
    private commonService: CommonService,
    private postService: PostService,
    public dialogRef: MatDialogRef<AddCommentPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.loggedInUserId = localStorage.getItem('userId');
  }

  close() {
    this.dialogRef.close();
  }

  addComment(comment: any) {
    this.comment = comment.innerText;

    let currentTime = this.commonService.getCurrentTime();

    let filter = {
      commentText: this.comment,
      commentedByUserId: this.loggedInUserId,
      commentUploadTime: currentTime,
    };

    this.postService
      .addComment(this.data._id, filter)
      .subscribe((data: any) => {
        if (data != null) {
          if (data.Success) {
            this.dialogRef.close('Refresh');
          }
        }
      });
  }

  goToProfile(element: any) {
    window.location.href = '/' + element.uploadedByUsername;
  }

  getUploadTime(uploadedTime: any) {
    return this.commonService.getUploadTime(uploadedTime);
  }
}
