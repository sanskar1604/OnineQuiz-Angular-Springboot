import { Component, OnInit } from '@angular/core';
import{MatCardModule} from'@angular/material/card';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  loginData={
    username:'',
    password:'',
  }

  constructor(private snack:MatSnackBar,private login:LoginService,private router:Router) { }

  ngOnInit(): void {}
  formSubmit(){
    console.log("login btn click");
    if(this.loginData.username.trim()==''||this.loginData.username==null){
      this.snack.open('username is required!! ','',{duration:3000,});return;

    }

    if(this.loginData.password.trim()==''||this.loginData.password==null){
      this.snack.open('password is required!! ','',{duration:3000,});return;

    }

    //request to server to ggenerate token
    this.login.generateToken(this.loginData).subscribe(
      (data:any)=>{
        console.log('Success');
        console.log(data);
        //login
        this.login.loginUser(data.token);
        this.login.getCurrentUser().subscribe(
          
          (user:any)=>{
            this.login.setUser(user);
            console.log("Yes....");
            console.log(user);
            //redirect   Admin Admin-dashboard
            //redirect user-dashboard

            if(this.login.getUserRole()=='ADMIN'){
              // window.location.href='/admin'
              this.router.navigate(['admin']);
              this.login.loginStatusSubject.next(true);

            }else if(this.login.getUserRole()=='NORMAL'){
              // window.location.href='/user-dashboard'
              this.router.navigate(['user-dashboard/0'])
              this.login.loginStatusSubject.next(true);


            }else{
              this.login.logOut();
            }
            
          }
        );
      },
      (error)=>{
        console.log('Error !ppppppppppp');
        console.log(error);
        this.snack.open('Invalid Details ! Try Again','',{duration:3000});
      }
      
    );


  }

}
