import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username : any = "";
  password : any = "";
  showRedSpan : boolean = false;

  constructor(private router:Router){
  }

  login(){
    console.log(this.username);
    console.log(this.password);
    if(this.username == "" || this.password == ""){
      this.showRedSpan = true;
    }else{
      this.showRedSpan = false;
        this.router.navigate(['home'])
    }
  }

  backToHome(){
    this.username = "";
    this.password = "";
  }

  usernameClick(user:any){
    this.username = user;
  } 
  
  passwordClick(pass:any){
    this.password = pass;
  }
}
