import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ProfileImageExpandComponent } from '../pop-ups/profile-image-expand/profile-image-expand.component';
import { AddPostComponent } from '../pop-ups/add-post/add-post.component';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UpdateUserComponent } from '../pop-ups/update-user/update-user.component';
import { CommonService } from '../services/common.service';

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
  showProfileOptions: boolean = false;
  showEditButtons: boolean = false;
  userData: any[] = [
    {
      name: 'Mr. Bean',
      username: 'mrbean',
      caption: 'I am Bean',
      time: '3h',
      likes: '12,313',
      comments: '102',
      imgUrl: './assets/img/bean.jpg',
    },
    {
      name: 'Dua',
      username: 'dualipa',
      caption: 'hey, Dua here ;)',
      time: '23h',
      likes: '1,012,313',
      comments: '4,127',
      imgUrl: './assets/img/dua.jpg',
    },
    {
      name: 'Camila',
      username: 'cabello.camila',
      caption: 'Hey!',
      time: '13h',
      likes: '800,443',
      comments: '1,509',
      imgUrl: './assets/img/camila.jpeg',
    },
    {
      name: 'Undertaker',
      username: 'rip',
      caption: 'Ride to heaven',
      time: '6h',
      likes: '12,313',
      comments: '889',
      imgUrl: './assets/img/beach.jpg',
    },
    {
      name: 'Ana',
      username: 'yours_ana',
      caption: 'Hi, I am Ana',
      time: '2h',
      likes: '3,442,066',
      comments: '6,984',
      imgUrl: './assets/img/ana.jpeg',
    },
    {
      name: 'Zara',
      username: 'zara',
      caption: 'heyy!!',
      time: '2h',
      likes: '642,330',
      comments: '938',
      imgUrl: './assets/img/zara.jpg',
    },
    {
      name: 'Landscape',
      username: 'land_scape',
      caption: 'PEACE',
      time: '3h',
      likes: '52,220',
      comments: '144',
      imgUrl: './assets/img/landscape.png',
    },
    {
      name: 'Tom Dorreto',
      username: 'fast_x',
      caption: 'Come ride with me',
      time: '1h',
      likes: '101,222',
      comments: '6,663',
      imgUrl: './assets/img/bugatti.jpg',
    },
    {
      name: 'Emily',
      username: 'emilyinparis',
      caption: '',
      time: '1h',
      likes: '1002',
      comments: '25',
      imgUrl: './assets/img/eiffil.jpeg',
    },
    {
      name: 'Moon',
      username: '_moon',
      caption: 'Bright Object',
      time: '1h',
      likes: '20,533',
      comments: '157',
      imgUrl: './assets/img/moon.jpg',
    },
    {
      name: 'Brutus',
      username: 'i_am_doggo',
      caption: ':)',
      time: '1h',
      likes: '8,348',
      comments: '82',
      imgUrl: './assets/img/dog.png',
    },
  ];

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
      if (result != 'reload') {
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
            } else {
              // this.errorMessage = data.message;
            }
          }
        });
      //   this.filesAmount = event.target.files.length;
      //   for (let i = 0; i < this.filesAmount; i++) {
      //     var reader = new FileReader();

      //     reader.onload = (event: any) => {
      //       console.log(event.target.result);
      //       this.images.push(event.target.result);
      //       this.firstFourImages.push(event.target.result);
      //     };

      //     reader.readAsDataURL(event.target.files[i]);
      //   }
    }
  }

  removeImage(imageType: any) {
    this.showProfileOptions = false;
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
          // this.profileData = { ...this.profileData };
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
          // this.refresh();

          // if (profileData.showTab != undefined) {
          //   this.showTab = profileData.showTab;
          // }
          this.viewUser();
        }
      }
    });
  }

  followActionUser(data: any) {
    if (data.type == 'follow') {
      this.follow(data);
    } else {
      this.unfollow(data);
    }
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
}
