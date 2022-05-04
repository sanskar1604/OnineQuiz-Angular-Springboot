import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    user:any=null;
  constructor(private login:LoginService) { }

  ngOnInit(): void {
          // get user details from localStorage
    this.user = this.login.getUser();


    // get user from server side
    // this.login.getCurrentUser().subscribe(
    //   (user:any)=>{
    //     this.user=user;
    //   },
    //   (error)=>{
    //     alert('error');
    //   }

    // );

  }

}
