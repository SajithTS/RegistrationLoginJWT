import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/shared/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  loginForm = {
    UserName:'',
    Password:''
  };
  constructor(private userService:UserService,private router:Router,private toastr: ToastrService) { }

  ngOnInit() {
    if(localStorage.getItem('token')){
      this.router.navigateByUrl('/home');
    }
  }

  login(form:NgForm){
    this.userService.login(form.value).subscribe((res:any) => {
      localStorage.setItem('token',res.token);
      this.router.navigateByUrl('/home');
    },
    err => {
      if(err.status == 400){
        this.toastr.error('Incorrect password', 'Login failed...');
      }
      else
      this.toastr.error('Login error', '');
    });
  }

}
