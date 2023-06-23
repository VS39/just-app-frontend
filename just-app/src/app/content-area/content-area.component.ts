import { Component } from '@angular/core';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { ImageExpandComponent } from '../pop-ups/image-expand/image-expand.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-content-area',
  templateUrl: './content-area.component.html',
  styleUrls: ['./content-area.component.css'],
})
export class ContentAreaComponent {
  faHeart = faHeart;

  postdata: any[] = [
    {
      name: 'Mr. Bean',
      username: 'mrbean',
      caption:
        'Hello kids! The childish Mr Bean uses his unusual wit to fulfil everyday tasks. But more often than not, he ends up creating trouble for himself and those around him.',
      time: '3h',
      imgUrl: './assets/img/bean.jpg',
    },
    {
      name: 'Dua',
      username: 'dualipa',
      caption:
        'Celebraatig birthday with friend and family tonight, having dinner with my dinner',
      time: '23h',
      imgUrl: './assets/img/dua.jpg',
    },
    {
      name: 'Camila',
      username: 'cabello.camila',
      caption: 'Hey!',
      time: '13h',
      imgUrl: './assets/img/camila.jpeg',
    },
    {
      name: 'Undertaker',
      username: 'rip',
      caption: 'Ride to heaven',
      time: '6h',
      imgUrl: './assets/img/beach.jpg',
    },
    {
      name: 'Ana',
      username: 'yours_ana',
      caption:
        'Wonderful evening in Tokyo, glad to announce my new movie with UnderTaker "Ride To Hell", only in theatres from 30th June. Go watch and show some love. - Ana ',
      time: '2h',
      imgUrl: './assets/img/ana.jpeg',
    },
    {
      name: 'Zara',
      username: 'zara',
      caption: 'this is my repeat post',
      time: '3h',
      imgUrl: './assets/img/zara.jpg',
    },
    {
      name: 'Landscape',
      username: 'land_scape',
      caption: 'this is landscape',
      time: '3h',
      imgUrl: './assets/img/landscape.png',
    },
    {
      name: 'Tom Dorreto',
      username: 'fast_x',
      caption: 'Come ride with me',
      time: '1h',
      imgUrl: './assets/img/bugatti.jpg',
    },
    {
      name: 'Emily',
      username: 'emilyinparis',
      caption:
        "Paris, France's capital, is a major European city and a global center for art, fashion, gastronomy and culture. Its 19th-century cityscape is crisscrossed by wide boulevards and the River Seine. Beyond such landmarks as the Eiffel Tower and the 12th-century, Gothic Notre-Dame cathedral, the city is known for its cafe culture and designer boutiques along the Rue du Faubourg Saint-Honoré.",
      time: '1h',
      imgUrl: './assets/img/eiffil.jpeg',
    },
    {
      name: 'Moon',
      username: '_moon',
      caption:
        'The Moon is Earths only natural satellite. Its diameter is about one-quarter of Earths, making it the fifth largest satellite in the Solar System and the largest and most massive relative to its parent planet. It is larger than all known dwarf planets in the Solar System.',
      time: '1h',
      imgUrl: './assets/img/moon.jpg',
    },
    {
      name: 'Brutus',
      username: 'i_am_doggo',
      caption: ':)',
      time: '1h',
      imgUrl: './assets/img/dog.png',
    },
  ];

  constructor(public dialog: MatDialog) {}

  likePicture(post: any) {
    post.liked = !post.liked;
  }

  onPostClick(post: any) {
    const dialogRef = this.dialog.open(ImageExpandComponent, {
      data: post,
      width: '1130px',
      // height: '700px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Result: ${result}`);
    });
  }
}
