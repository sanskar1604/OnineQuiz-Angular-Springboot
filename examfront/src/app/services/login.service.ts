import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public loginStatusSubject = new Subject<boolean>();

  constructor(private http:HttpClient) { }
//Current user: which is logged in
  public getCurrentUser(){
    return this.http.get(`${baseUrl}/current-user`);
  }

// Generate token
public generateToken(loginData:any){
 return this.http.post(`${baseUrl}/generate-token`,loginData)
}

//Login User:set Token in local storage
public loginUser(token:any){
  localStorage.setItem('token',token);
  return true;
}

//isLogin user is Logged in or not
public isLoggedIn(){
  let tokenStr=localStorage.getItem("token")
  console.log("token is in local..."+tokenStr)
  if(tokenStr==undefined||tokenStr==''||tokenStr==null){
    return false;
  }else{
    return true;
  }
}
//LogOut remove token from local storage

public logOut(){
  localStorage.removeItem('token');
  localStorage.removeItem('user');

  return true;
}
//getToken

public getToken(){
  return localStorage.getItem('token');
}
//setUserDetails
public setUser(user:any){
  localStorage.setItem('user',JSON.stringify(user));

}

//getUser
public getUser(){
  let userStr= localStorage.getItem('user');
  console.log(userStr+"pk")
 if(userStr!=null){
   console.log('User here 123');
   return JSON.parse(userStr);
 }else{ 
  console.log('User here else');
   this.logOut();
   return null;

 }
}



//get userRole
public getUserRole(){
  let user=this.getUser()
  return user.authorities[0].authority;
}

}
