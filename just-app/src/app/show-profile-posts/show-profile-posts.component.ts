import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { ImageExpandComponent } from '../pop-ups/image-expand/image-expand.component';
import { PostService } from '../services/post.service';
import { EditPostComponent } from '../pop-ups/edit-post/edit-post.component';
import { CommonService } from '../services/common.service';
import { DeleteComponent } from '../pop-ups/delete/delete.component';
import { BehaviorSubject } from 'rxjs';
import { LikesPopupComponent } from '../pop-ups/likes-popup/likes-popup.component';
import { AddCommentPopupComponent } from '../pop-ups/add-comment-popup/add-comment-popup.component';
import { CommentsPopupComponent } from '../pop-ups/comments-popup/comments-popup.component';

@Component({
  selector: 'app-show-profile-posts',
  templateUrl: './show-profile-posts.component.html',
  styleUrls: ['./show-profile-posts.component.css'],
})
export class ShowProfilePostsComponent implements AfterViewChecked {
  @Input() userPosts: any;
  @Input() showEditButtons: boolean = false;
  @Input() showGridButtons: boolean = false;
  singlePost: boolean = true;
  faHeart = faHeart;
  loggedInUserId: any;
  trimNo =200;
  faCircleUser = faCircleUser;
  @Output() refreshPage: any = new EventEmitter<any>();
  dataSubject!: BehaviorSubject<any>;
  postDataPrev: any;
  showUpdate: boolean = false;
  updateData2: any;

  constructor(
    public dialog: MatDialog,
    public postService: PostService,
    public commonService: CommonService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loggedInUserId = localStorage.getItem('userId');
    this.getLimitedItems();
  }

  ngAfterViewChecked() {
    this.getLimitedItems();
    if (this.userPosts) {
      this.userPosts.forEach((element: any, i: number) => {
        if (this.singlePost) {
          if (element.image.length == 2) {
            element.height = 245;
            element.width = '50%';
          }
          if (element.image.length > 2) {
            element.height = 149;
            element.width = '50%';
          }
        }
        if (!this.singlePost) {
          if (element.image.length == 2) {
            element.height = 298;
            element.width = '50%';
          }

          if (element.image.length > 2) {
            element.height = 149;
            element.width = '50%';
          }
        }

        this.cdRef.detectChanges();
      });
    }
  }

  changeGrid() {
    this.singlePost = !this.singlePost;
  }

  likePicture(post: any) {
    let filter = {
      userId: this.loggedInUserId,
    };
    this.postService.like(post._id, filter).subscribe((data: any) => {
      if (data != null) {
        if (data.Success) {
          // post.liked = !post.liked;
          this.refreshPage.emit('Refresh');
        }
      }
    });
  }

  setIsLikedProperty(): void {
    // Iterate through the posts and set the isLiked property based on the logged-in user's liking
    this.userPosts.forEach((post: any) => {
      post.likes.isLiked = post.likes.users.some(
        (user: any) => user._id === this.loggedInUserId
      );
    });
  }

  getLimitedItems() {
    if (this.userPosts) {
      this.userPosts.forEach((element: any) => {
        if (element.image.length > 4) {
          element.image2 = element.image.slice(0, 4);
        } else {
          element.image2 = element.image;
        }
      });
      this.setIsLikedProperty();
    }
    if (this.showUpdate) {
      this.updateData2 = this.userPosts;
      let element;
      if (this.updateData2) {
        this.updateData2.forEach((data: any) => {
          if (this.postDataPrev.userData._id == data._id) {
            element = data;
          }
        });
      }

      let postData = {
        userData: element,
        clickedImage: this.postDataPrev.clickedImage,
      };

      this.dataSubject.next(postData);
    }
  }

  goToProfile(element: any) {
    window.location.href = '/' + element.uploadedByUsername;
  }

  editPost(element: any) {
    const dialogRef = this.dialog.open(EditPostComponent, {
      data: element,
      width: '600px',
      // height: '90%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.refreshPage.emit('Refresh');
      }
    });
  }

  deletePost(element: any) {
    const dialogRef = this.dialog.open(DeleteComponent, {
      data: {
        icon: 'fa fa-trash-o',
        message: 'Are you sure you want to delete?',
        button: 'Delete',
      },
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result == 'Delete') {
        this.postService.deletePost(element._id).subscribe((data: any) => {
          if (data != null) {
            if (data.Success) {
              this.refreshPage.emit('Refresh');
            }
          }
        });
      }
    });
  }

  getUploadTime(uploadedTime: any) {
    return this.commonService.getUploadTime(uploadedTime);
  }

  seeLikes(element: any) {
    const dialogRef = this.dialog.open(LikesPopupComponent, {
      data: element,
      width: '600px',
      // height: '90%',
    });

    // Subscribe to the data observable of the dialog component
    dialogRef.componentInstance.data$.subscribe((data: any) => {
      if (data) {
        this.refreshPage.emit('Refresh');
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.refreshPage.emit('Refresh');
      }
    });
  }

  addComment(element: any) {
    const dialogRef = this.dialog.open(AddCommentPopupComponent, {
      data: element,
      width: '600px',
      // height: '90%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.refreshPage.emit('Refresh');
      }
    });
  }

  showComments(element: any) {
    let postData = {
      userData: element,
    };
    this.postDataPrev = postData;
    this.dataSubject = new BehaviorSubject<any>(postData);

    const dialogRef = this.dialog.open(CommentsPopupComponent, {
      data: {
        postImage: this.dataSubject,
        updateData: this.updateData.bind(this),
      },
      width: '600px',
      // height: '700px',
    });

    // Subscribe to the data observable of the dialog component
    dialogRef.componentInstance.data$.subscribe((data: any) => {
      if (data) {
        this.refreshPage.emit('Refresh');
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      // console.log(`Result: ${result}`);
    });
  }

  expandImage(element: any, clickedImage: any) {
    let postData = {
      userData: element,
      clickedImage: clickedImage,
    };
    this.postDataPrev = postData;
    this.dataSubject = new BehaviorSubject<any>(postData);

    const dialogRef = this.dialog.open(ImageExpandComponent, {
      data: {
        postImage: this.dataSubject,
        updateData: this.updateData.bind(this),
      },
      height: '95vh',
      maxWidth: '95vw',
      minWidth: '95vw',
      // width: '1130px',
      // height: '700px',
    });

    // Subscribe to the data observable of the dialog component
    dialogRef.componentInstance.data$.subscribe((data: any) => {
      if (data) {
        this.refreshPage.emit('Refresh');
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      // console.log(`Result: ${result}`);
    });
  }

  updateData(postDataPrev: any, msg?: any) {
    this.showUpdate = false;
    if (msg) {
      this.refreshPage.emit('Refresh');
    } else {
      this.likePicture(postDataPrev.userData);
    }

    this.showUpdate = true;
  }

  showMore(element: any) {
    element.showFullText = true;
  }

  hide(element: any) {
    element.showFullText = false;
  }
}
