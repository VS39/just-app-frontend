import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IconMessagePopUpComponent } from '../pop-ups/icon-message-pop-up/icon-message-pop-up.component';
import * as CryptoJS from 'crypto-js';
import { MessagePopUpComponent } from '../pop-ups/message-pop-up/message-pop-up.component';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  key = 'aFpdCWpbkjhgfd@12345tgb4RhmX10Um'; // length == 32
  iv = 'Hp@0bJeW95EzxKup'; // length == 16
  constructor(public dialog: MatDialog, private datePipe: DatePipe) {}

  encrypt(value: any) {
    var key8 = CryptoJS.enc.Utf8.parse(this.key);
    var iv8 = CryptoJS.enc.Utf8.parse(this.iv);

    return CryptoJS.AES.encrypt(value, key8, {
      keySize: 32,
      iv: iv8,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    }).toString();
  }

  decrypt(value: any) {
    var key8 = CryptoJS.enc.Utf8.parse(this.key);
    var iv8 = CryptoJS.enc.Utf8.parse(this.iv);

    return CryptoJS.AES.decrypt(value, key8, {
      keySize: 32,
      iv: iv8,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    }).toString(CryptoJS.enc.Utf8);
  }

  // encrypt(value: any) {
  //   return CryptoJS.AES.encrypt(this.key, value).toString();
  // }

  // decrypt(value: any) {
  //   return CryptoJS.AES.decrypt(this.key, value).toString(CryptoJS.enc.Utf8);
  // }

  openIconMessagePopUp(
    icon: any,
    message: any,
    title?: any,
    subMessage?: any,
    reload?: boolean
  ): void {
    const dialogRef = this.dialog.open(IconMessagePopUpComponent, {
      data: {
        icon: icon,
        title: title,
        message: message,
        subMessage: subMessage,
      },
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        if (reload && reload != undefined) {
          window.location.reload();
        }
      }
    });
  }

  openMessagePopUpComponent(
    message: any,
    title?: any,
    subMessage?: any,
    reload?: boolean
  ): void {
    const dialogRef = this.dialog.open(MessagePopUpComponent, {
      data: {
        title: title,
        message: message,
        subMessage: subMessage,
      },
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        if (reload && reload != undefined) {
          window.location.reload();
        }
      }
    });
  }

  getUploadTime(uploadedTime: any) {
    const now = new Date();
    let currentDate = this.datePipe.transform(now, 'yyyy-MM-dd');
    let currentTime = this.datePipe.transform(now, 'HH:mm:ss');
    let time: any;
    if (currentDate && currentTime) {
      time = currentDate + ' ' + currentTime;
    }

    const currentTimeNow = new Date(time);
    const postUploadedTime = new Date(uploadedTime);
    const timeDifference =
      currentTimeNow.getTime() - postUploadedTime.getTime();

    const durationInSeconds = Math.floor(timeDifference / 1000);
    const durationInMinutes = Math.floor(durationInSeconds / 60);
    const durationInHours = Math.floor(durationInMinutes / 60);
    const durationInDays = Math.floor(durationInHours / 24);
    const durationInWeeks = Math.floor(durationInDays / 7);

    const currentYear = currentTimeNow.getFullYear();
    const currentMonth = currentTimeNow.getMonth();
    const postCreationYear = postUploadedTime.getFullYear();
    const postCreationMonth = postUploadedTime.getMonth();

    const durationInMonths =
      (currentYear - postCreationYear) * 12 +
      (currentMonth - postCreationMonth);

    const durationInYears = Math.floor(durationInMonths / 12);

    let durationString = '';

    if (durationInYears > 0) {
      durationString += `${durationInYears} year(s) ago`;
    } else if (durationInMonths > 0) {
      durationString += `${durationInMonths} month(s) ago`;
    } else if (durationInWeeks > 0) {
      durationString += `${durationInWeeks} week(s) ago`;
    } else if (durationInDays > 0) {
      durationString += `${durationInDays} day(s) ago`;
    } else if (durationInHours > 0) {
      durationString += `${durationInHours} hour(s) ago`;
    } else if (durationInMinutes > 0) {
      durationString += `${durationInMinutes} minute(s) ago`;
    } else {
      durationString += `${durationInSeconds} second(s) ago`;
    }
    return durationString;
  }

  getCurrentTime() {
    const now = new Date();
    let currentTimeNow;

    let currentDate = this.datePipe.transform(now, 'yyyy-MM-dd');
    let currentTime = this.datePipe.transform(now, 'HH:mm:ss');
    if (currentDate && currentTime) {
      currentTimeNow = currentDate + ' ' + currentTime;
    }
    return currentTimeNow;
  }

  formatNumber(number: any) {
    if (number >= 1000000) {
      return (number / 1000000).toFixed(1) + 'M';
    } else if (number >= 100000) {
      return (number / 1000).toFixed(0) + 'k';
    } else if (number >= 10000) {
      return (number / 1000).toFixed(1) + 'k';
    } else if (number >= 1000) {
      return (number / 1000).toFixed(2) + 'k';
    } else {
      return number.toString();
    }
  }
}
