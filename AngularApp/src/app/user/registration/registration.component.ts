import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from "@angular/forms";
import { UserService } from 'src/app/shared/user.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html'
})
export class RegistrationComponent implements OnInit {
  registrationForm:any;
  constructor(private fb:FormBuilder,private userService:UserService,private toastr: ToastrService) { }

  ngOnInit() {
    this.registrationForm = this.fb.group({
      UserName : ['',Validators.required],
      Email : ['',Validators.email],
      FullName : [''],
      Passwords : this.fb.group({
        Password : ['',Validators.required],
        ConfirmPassword : ['',Validators.required]
      },{ validator: this.comparePasswords })
    });
  }
  comparePasswords(fb:FormGroup){
    let confirmPasswordCtrl = fb.get('ConfirmPassword');
    if(confirmPasswordCtrl.errors == null || 'passwordMismatch' in confirmPasswordCtrl.errors){
    let confirmPasswordCtrl = fb.get('ConfirmPassword');
    if(fb.get('Password').value != confirmPasswordCtrl.value)
      confirmPasswordCtrl.setErrors({passwordMismatch:true})
    else
      confirmPasswordCtrl.setErrors(null)
    }
  }

  register(){
    var body = {
      UserName :this.registrationForm.value.UserName,
      Email :this.registrationForm.value.Email,
      FullName :this.registrationForm.value.FullName,
      Password :this.registrationForm.value.Passwords.Password
    };
    this.userService.register(body).subscribe((res:any) =>{
      if(res.succeeded){
        this.registrationForm.reset();
        this.toastr.success('Registration success', 'Success');
      }
      else{
        res.errors.forEach(element => {
          switch(element.code){
            case 'DuplicateUserName':
                this.toastr.error('Username exists', 'Failed');
              break;
            default:
                this.toastr.error(element.description, 'Registration failed...');
              break;
          }
        });
      }
    },
    err => {
      console.log(err);
    });
  }

}
