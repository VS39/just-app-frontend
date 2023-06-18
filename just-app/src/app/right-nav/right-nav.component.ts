import { Component } from '@angular/core';

@Component({
  selector: 'app-right-nav',
  templateUrl: './right-nav.component.html',
  styleUrls: ['./right-nav.component.css']
})
export class RightNavComponent {

  happeningData:any[]=[
    {
      "topic":"sports",
      "trending":"bat-ka-grip",
      "noOfTweets":"12k"
    },
    {
      "topic":"politics",
      "trending":"modi-rahul",
      "noOfTweets":"56k"
    },
    {
      "topic":"movie",
      "trending":"aadipurush",
      "noOfTweets":"234k"
    },
    {
      "topic":"fashion",
      "trending":"vans",
      "noOfTweets":"24k"
    }
  ]
}
