import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Title } from '../../partials/title/title';
import { NgIf } from "@angular/common";
import { UserService } from '../../../services/user';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [Title, ReactiveFormsModule, NgIf],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit{

loginForm!:FormGroup;
isSubmitted= false;
returnUrl="";

get fc(){
  return this.loginForm.controls;
}
submit(){
  this.isSubmitted=true;
  if(this.loginForm.invalid) return ;
  alert("email"+`${this.fc["email"].value}`)
  this.userService.login(this.loginForm.value).subscribe((user)=>{

      this.router.navigateByUrl(this.returnUrl);

  })
}
constructor(private formBuilder:FormBuilder,private userService:UserService ,private router:Router,private activatedRoute:ActivatedRoute){}
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
        email:['',[Validators.required,Validators.email]],
        password :['',Validators.required]});


    this.returnUrl = this.activatedRoute.snapshot.queryParams["returnUrl"] || "/";    


  }




}
