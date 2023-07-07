import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-followers',
  templateUrl: './show-followers.component.html',
  styleUrls: ['./show-followers.component.css'],
})
export class ShowFollowersComponent implements OnChanges {
  @Input() showTab: any;
  @Input() data: any;
  @Input() username: any;
  @Input() loggedInUserId: any;
  @Input() showEditButtons: boolean = false;
  loggedInUserFollowLists: any;
  @Output() followActionData: any = new EventEmitter<any>();
  // showFollowingButton: any;
  // showFollowButton: any;

  constructor(private userService: UserService, private router:Router) {}

  ngOnInit() {
    this.getfollowList();

    // this.loggedInUserFollowLists.followingList.forEach((list: any) => {
    //   this.data.forEach((element: any) => {
    //     // list.showFollowingButton = false;
    //     if (list._id == element._id) {
    //       element.showFollowingButton = true;
    //     } else {
    //       element.showFollowingButton = false;
    //     }
    //   });
    // });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.getfollowList();
    }
  }

  followAction(element: any, type: any) {
    let profileData = {
      id: element._id,
      username: element.username,
      type: type,
      showTab: this.showTab,
    };
    this.followActionData.emit(profileData);
  }

  // toggleFollow() {
  //   this.showFollowButton = false;
  //   this.showFollowingButton = true;
  // }

  // toggleFollowing() {
  //   this.showFollowButton = true;
  //   this.showFollowingButton = false;
  // }

  // updateList(){
  //   this.followList.forEach((item1: any) => {
  //     // Check if there is a matching item in the second array
  //     const hasMatch = this.loggedInUserFollowLists.followingList.some(
  //       (item2: any) => item2._id === item1._id
  //     );
  //     // Set the boolean value based on the match
  //     item1.showFollowingButton = hasMatch;
  //   });
  // }

  getfollowList() {
    this.userService
      .getfollowList(this.loggedInUserId)
      .subscribe((data: any) => {
        if (data != null) {
          if (data.Success) {
            this.loggedInUserFollowLists = data.Data.followingList;

            this.data.forEach((item1: any) => {
              // Check if there is a matching item in the second array
              const hasMatch = this.loggedInUserFollowLists.some(
                (item2: any) => item2._id === item1._id
              );
              // Set the boolean value based on the match
              item1.showFollowingButton = hasMatch;
            });

          }
        }
      });
  }

  goToProfile(element:any) {
    // this.router.navigate(['/' + element.username]);
    window.location.href = '/' + element.username;
  }
}
