import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IconMessagePopUpComponent } from '../pop-ups/icon-message-pop-up/icon-message-pop-up.component';
import * as CryptoJS from 'crypto-js';
import { MessagePopUpComponent } from '../pop-ups/message-pop-up/message-pop-up.component';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  key = 'aFpdCWpbkjhgfd@12345tgb4RhmX10Um'; // length == 32
  iv = 'Hp@0bJeW95EzxKup'; // length == 16
  constructor(public dialog: MatDialog) {}

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
}
