import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { CommonService } from '../services/common.service';
import { PostService } from '../services/post.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteComponent } from '../pop-ups/delete/delete.component';

@Component({
  selector: 'app-show-comments',
  templateUrl: './show-comments.component.html',
  styleUrls: ['./show-comments.component.css'],
})
export class ShowCommentsComponent implements AfterViewChecked {
  @Input() data: any;
  @Output() followActionData: any = new EventEmitter<any>();

  loggedInUserId: any;
  addReplyClicked: boolean = false;
  addCommentClicked: boolean = false;
  prevElement: any;
  trimNo =200;

  @ViewChild('commentControl') commentControlRef!: ElementRef;
  @ViewChild('commentControl') set commentControlRef2(ref: ElementRef) {
    if (!!ref) {
      ref.nativeElement.focus();
    }
  }

  @ViewChild('replyControl') replyControlref!: ElementRef;
  @ViewChild('replyControl') set replyControlRef2(ref: ElementRef) {
    if (!!ref) {
      ref.nativeElement.focus();
    }
  }

  constructor(
    public dialog: MatDialog,
    private cdRef: ChangeDetectorRef,
    private commonService: CommonService,
    private postService: PostService
  ) {
    this.loggedInUserId = localStorage.getItem('userId');
  }

  ngAfterViewChecked(): void {
    this.setIsLikedPropertyComment();
    this.setIsLikedPropertyReply();
    if (this.prevElement) {
      this.data.comments.comments.forEach((element: any) => {
        if (
          this.prevElement._id == element._id &&
          this.prevElement.showReplies == true
        ) {
          element.showReplies = true;
        }
      });
    }

    this.cdRef.detectChanges();
  }

  ngOnInit() {
    this.data.comments.comments.forEach((element: any) => {
      element.editComment = false;
      element.addReply = false;
      element.showReplies = false;
    });
  }

  showReplies(element: any) {
    element.showReplies = true;
  }

  hideReplies(element: any) {
    element.showReplies = false;
  }

  deleteReply(element: any, reply: any) {
    const dialogRef = this.dialog.open(DeleteComponent, {
      data: {
        icon: 'fa fa-trash-o',
        message: 'Are you sure you want to delete?',
        button: 'Delete',
      },
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result == 'Delete') {
        this.prevElement = element;

        this.postService
          .deleteReply(this.data._id, element._id, reply._id)
          .subscribe((data: any) => {
            if (data != null) {
              if (data.Success) {
                this.followActionData.emit('Refresh');
              }
            }
          });
      }
    });
  }

  replyToComment(element: any) {
    element.editComment = false;
    element.addReply = true;
  }

  closeReply(element: any) {
    element.addReply = false;
    this.addReplyClicked = false;
    this.addCommentClicked = false;
  }

  addReply(element: any) {
    this.prevElement = element;

    const commentValue = this.replyControlref.nativeElement.value;
    if (commentValue == '') {
      this.addReplyClicked = true;
      return;
    }

    let currentTime = this.commonService.getCurrentTime();

    let filter = {
      commentText: commentValue,
      commentedByUserId: this.loggedInUserId,
      commentUploadTime: currentTime,
    };

    this.postService
      .addReply(this.data._id, element._id, filter)
      .subscribe((data: any) => {
        if (data != null) {
          if (data.Success) {
            // element.editComment = false;
            // element.addReply = false;
            this.followActionData.emit('Refresh');
          }
        }
      });
  }

  replyInput(reply: any) {
    if (reply != '') {
      this.addReplyClicked = false;
    }
  }

  commentInput(reply: any) {
    if (reply != '') {
      this.addCommentClicked = false;
    }
  }

  editComment(element: any, i: number) {
    element.editComment = true;
    element.addReply = false;
    element.showReplies = false;
  }

  saveComment(element: any, i: number) {
    const commentValue = this.commentControlRef.nativeElement.value;

    if (commentValue == '') {
      this.addCommentClicked = true;
      return;
    }

    let currentTime = this.commonService.getCurrentTime();

    let filter = {
      commentText: commentValue,
      commentId: element._id,
      commentUpdateTime: currentTime,
    };

    this.postService
      .updateComment(this.data._id, filter)
      .subscribe((data: any) => {
        if (data != null) {
          if (data.Success) {
            element.editComment = false;
            element.addReply = false;
            element.isEdited = true;
            element.commentUpdateTime = currentTime;
            this.followActionData.emit('Refresh');
          }
        }
      });
  }

  deleteComment(element: any) {
    const dialogRef = this.dialog.open(DeleteComponent, {
      data: {
        icon: 'fa fa-trash-o',
        message: 'Are you sure you want to delete?',
        button: 'Delete',
      },
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result == 'Delete') {
        this.postService
          .deleteComment(this.data._id, element._id)
          .subscribe((data: any) => {
            if (data != null) {
              if (data.Success) {
                this.followActionData.emit('Refresh');
              }
            }
          });
      }
    });
  }

  closeComment(element: any) {
    element.editComment = false;
    this.addReplyClicked = false;
    this.addCommentClicked = false;
  }

  likeComment(element: any) {
    this.prevElement = element;
    let filter = {
      userId: this.loggedInUserId,
    };
    this.postService
      .likeComment(this.data._id, element._id, filter)
      .subscribe((data: any) => {
        if (data != null) {
          if (data.Success) {
            this.followActionData.emit('Refresh');
          }
        }
      });
  }

  likeReply(element: any, reply: any) {
    this.prevElement = element;
    let filter = {
      userId: this.loggedInUserId,
    };
    this.postService
      .likeReply(this.data._id, element._id, reply._id, filter)
      .subscribe((data: any) => {
        if (data != null) {
          if (data.Success) {
            this.followActionData.emit('Refresh');
          }
        }
      });
  }

  goToProfile(element: any) {
    window.location.href = '/' + element.commentedByUsername;
  }

  getUploadTime(uploadedTime: any) {
    return this.commonService.getUploadTime(uploadedTime);
  }

  setIsLikedPropertyComment(): void {
    // Iterate through the comments and set the isLiked property based on the logged-in user's liking
    if (this.data) {
      this.data.comments.comments.forEach((element: any) => {
        element.likes.isLiked = element.likes.users.some(
          (user: any) => user._id === this.loggedInUserId
        );
      });
    }
  }

  setIsLikedPropertyReply(): void {
    // Iterate through the replies and set the isLiked property based on the logged-in user's liking
    if (this.data) {
      this.data.comments.comments.forEach((element: any) => {
        element.replies.replies.forEach((rep: any) => {
          rep.likes.isLiked = rep.likes.users.some(
            (user: any) => user._id === this.loggedInUserId
          );
        });
      });
    }
  }

  formatNumber(number: any) {
    return this.commonService.formatNumber(number);
  }

  showMore(element: any) {
    element.showFullText = true;
  }

  hide(element: any) {
    element.showFullText = false;
  }
}
