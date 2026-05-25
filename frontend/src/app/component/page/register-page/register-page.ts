import { Component, OnInit } from '@angular/core';
import { Title } from '../../partials/title/title';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../services/user';
import { ActivatedRoute, Router } from '@angular/router';
import { PasswordsMatchValidator } from '../../../shared/validator/password_check_vaidator';
import { IUserRegister } from '../../../shared/interfaces/IuserRegistre';
import { NgIf } from '@angular/common';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register-page',
  imports: [Title,ReactiveFormsModule
    ,CommonModule],
  templateUrl: './register-page.html',
  styleUrl: './register-page.css',
})
export class RegisterPage  implements OnInit{

registerForm!:FormGroup;
isSubmitted = false;
returnUrl =" ";
constructor(private formBuilder:FormBuilder,private userService : UserService,private activatedRoute :ActivatedRoute,private router :Router){ 




 }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
        name :['',Validators.required,Validators.minLength(3) ],
        email:['',Validators.required,Validators.email],
            address:['',Validators.required],
        password :['',Validators.required,Validators.minLength(6)],
        confirmPassword :['',Validators.required]
    },{validators: PasswordsMatchValidator('password','confirmPassword')});
this.returnUrl = this.activatedRoute.snapshot.queryParams["returnUrl"] || "/";

  }


get fc() {
  return this.registerForm.controls as {
    [key: string]: FormControl;
  };
}

  submit(){


    this.isSubmitted = true;
    if(this.registerForm.invalid) return ;
    const fv = this.registerForm.value;
    const user :IUserRegister = {
      name:fv.name,
      email:fv.email,
      password:fv.password,
      confirmPassword:fv.confirmPassword,
      address:fv.address
    };
    this.userService.register(user).subscribe((_)=>{
      this.router.navigateByUrl(this.returnUrl);

    })

    
  }


}
