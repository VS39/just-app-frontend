import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-show-followers',
  templateUrl: './show-followers.component.html',
  styleUrls: ['./show-followers.component.css'],
})
export class ShowFollowersComponent {
  @Input() showTab: any;
  @Input() userData: any;
  imgUrl = './assets/img/ana.jpeg';

  ngOnInit() {
    console.log(this.showTab);
    console.log(this.userData);
  }
}
