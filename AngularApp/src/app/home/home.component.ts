import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {
  userDetails:any;
  constructor(private router:Router,private userService:UserService) { }

  ngOnInit() {
    this.userService.getUserProfile().subscribe((res:any) => {
      this.userDetails = res;
    })
  }

  onLogout(){
    localStorage.clear();
    this.router.navigate(['/user/login']);
  }

}
