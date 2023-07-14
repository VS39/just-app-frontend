import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ProfileImageExpandComponent } from '../pop-ups/profile-image-expand/profile-image-expand.component';
import { AddPostComponent } from '../pop-ups/add-post/add-post.component';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UpdateUserComponent } from '../pop-ups/update-user/update-user.component';
import { CommonService } from '../services/common.service';
import { DeleteComponent } from '../pop-ups/delete/delete.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  showTab: any = 'post';
  userName: any;
  loggedInUserFollowLists: any;
  loggedInUserId: any;
  defaultBackgroundPic = './assets/img/aqua.jpg';
  showPage: boolean = false;
  showGridButtons: boolean = true;
  showProfileOptions: boolean = false;
  showEditButtons: boolean = false;

  profileData: any;

  constructor(
    private location: Location,
    public dialog: MatDialog,
    public router: Router,
    private userService: UserService,
    private commonService: CommonService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.userName = this.activatedRoute.snapshot.paramMap.get('username');
    this.loggedInUserId = localStorage.getItem('userId');
    this.viewUser();
  }

  back() {
    this.location.back();
    // window.location.href = '/' + this.userData.userName;
  }

  viewUser() {
    this.userService.viewUser(this.userName).subscribe((data: any) => {
      this.showPage = true;
      if (data != null) {
        if (data.Success) {
          this.profileData = data.Data;

          // this.profileData.userFollowers = this.profileData.userFollowers.map((element:any) => {
          //   return {
          //     ...element,
          //     showFollowingButton: false
          //   };
          // });

          // this.profileData.userFollowing = this.profileData.userFollowing.map((element:any) => {
          //   return {
          //     ...element,
          //     showFollowingButton: false
          //   };
          // });

          // this.getfollowList();
          if (this.loggedInUserId == this.profileData.id) {
            // if(this.profileData.logedInUserId == this.profileData.id){
            this.showEditButtons = true;
          } else {
            this.showEditButtons = false;
          }
        }
      }
    });
  }

  onTabClick(tab: any) {
    this.showTab = tab;
  }

  expandImage(element: any) {
    this.showProfileOptions = false;
    const dialogRef = this.dialog.open(ProfileImageExpandComponent, {
      data: element,
      // width: '1000px',
      // height: '90%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      // console.log(`Result: ${result}`);
    });
  }

  addPost() {
    let sendData = {
      id: this.profileData.id,
      sentFrom: 'user-profile',
    };
    const dialogRef = this.dialog.open(AddPostComponent, {
      data: sendData,
      width: '600px',
      // height: '90%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // this.viewUser();
        window.location.reload();
      }
      // console.log(`Result: ${result}`);
    });
  }

  uploadPic(event: any, imageType: any) {
    // console.log(event);
    this.showProfileOptions = false;
    if (event.target.files && event.target.files[0]) {
      let uploadedImage = event.target.files[0];
      // let filter = {
      //   profilePic: ,
      // };
      // console.log(profilePic);
      this.userService
        .updateUserImage(uploadedImage, this.profileData.id, imageType)
        .subscribe((data: any) => {
          if (data != null) {
            if (data.Success) {
              this.viewUser();
            }
          }
        });
    }
  }

  removeImage(imageType: any) {
    this.showProfileOptions = false;
    const dialogRef = this.dialog.open(DeleteComponent, {
      data: {
        icon: 'fa fa-times',
        message: 'Are you sure you want to remove the picture?',
        button: 'Remove',
      },
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result == 'Delete') {
        
        let uploadedImage = '';
        this.userService
          .updateUserImage(uploadedImage, this.profileData.id, imageType)
          .subscribe((data: any) => {
            if (data != null) {
              if (data.Success) {
                this.viewUser();
              } else {
              }
            }
          });
      }
    });
  }

  onFileClick(event: any) {
    event.target.value = '';
  }

  onUserPic(type: any) {
    if (type == 'ProfilePic') {
      this.showProfileOptions = true;
    }
  }

  outsideClick() {
    this.showProfileOptions = false;
  }

  editProfile() {
    const dialogRef = this.dialog.open(UpdateUserComponent, {
      data: this.profileData,
      width: '600px',
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        // this.router.navigate([result]);
        window.location.href = result;
      }
    });
  }

  openWebsiteLink() {
    window.open('https://' + this.profileData.website);
  }

  follow(profileData: any) {
    let filter = {
      id: this.loggedInUserId,
    };
    this.userService.follow(filter, profileData.id).subscribe((data: any) => {
      if (data != null) {
        if (data.Success) {
          // this.commonService.openMessagePopUpComponent(
          //   `You started following ${profileData.username}.`,
          //   '',
          //   ''
          // );
          // this.refresh();
          this.viewUser();
        }
      }
    });
  }

  unfollow(profileData: any) {
    let filter = {
      id: this.loggedInUserId,
    };
    this.userService.unfollow(filter, profileData.id).subscribe((data: any) => {
      if (data != null) {
        if (data.Success) {
          // this.commonService.openMessagePopUpComponent(
          //   `You unfollowed ${profileData.username}.`,
          //   '',
          //   ''
          // );

          this.viewUser();
        }
      }
    });
  }

  followActionUser(data: any) {
    this.viewUser();
    // if (data.type == 'follow') {
    //   this.follow(data);
    // } else {
    //   this.unfollow(data);
    // }
  }

  getfollowList() {
    this.userService
      .getfollowList(this.loggedInUserId)
      .subscribe((data: any) => {
        this.showPage = true;
        if (data != null) {
          if (data.Success) {
            this.loggedInUserFollowLists = data.Data;
          }
        }
      });
  }

  // refresh() {
  //   const currentRoute = this.router.url;

  //   this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
  //     this.router.navigate([currentRoute]); // navigate to same route
  //   });
  // }

  refreshPage(data: any) {
    if (data) {
      this.viewUser();
    }
  }

  getJoinedTime(dateString: any) {
    const date = new Date(dateString);

    const month = date.toLocaleString('en-US', { month: 'long' });
    const year = date.getFullYear();

    const formattedString = `Joined ${month}, ${year}`;
    return formattedString;
  }
}
