import { Component } from '@angular/core';

@Component({
  selector: 'app-right-nav',
  templateUrl: './right-nav.component.html',
  styleUrls: ['./right-nav.component.css']
})
export class RightNavComponent {

  imgUrl="./assets/img/ana.jpeg";

  happeningData:any[]=[
    {
      "topic":"Sports",
      "trending":"bat-ka-grip",
      "noOfTweets":"12k"
    },
    {
      "topic":"Politics",
      "trending":"modi-rahul",
      "noOfTweets":"56k"
    },
    {
      "topic":"Movie",
      "trending":"aadipurush",
      "noOfTweets":"234k"
    },
    {
      "topic":"Fashion",
      "trending":"vans",
      "noOfTweets":"24k"
    }
  ]
}
