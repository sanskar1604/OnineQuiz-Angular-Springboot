import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.css']
})
export class AddAdminComponent implements OnInit {

  constructor(private userService:UserService,private snack:MatSnackBar) { }
  public user={
    username:'',
    password:'',
    firstName:'',
    lastName:'',
    email:'',
    phone:'',
  };
  addAdmin:any;
  ngOnInit(): void {}

  formSubmit(){
    console.log(this.user);
    if(this.user.username==''|| this.user.username==null){
      // alert('User is Required !!');
      this.snack.open("Username is required",'ok',{duration:3000});

      return;
    }
    
    this.userService.addAdmin(this.user).subscribe(
      (data)=>{
        console.log(data)
        // alert('sucess');
        Swal.fire('Successfully Registerd','User is registerd','success');
        this.user={
          username:'',
          password:'',
          firstName:'',
          lastName:'',
          email:'',
          phone:'',
        };

      },
      (error)=>{
        console.log(error);
        // alert('somthing went wrong');
        this.snack.open('something went wrong ','',{duration:3000})
      }
    )
  }

  clear(){
    this.user={
      username:'',
      password:'',
      firstName:'',
      lastName:'',
      email:'',
      phone:'',
    };
  }

}
