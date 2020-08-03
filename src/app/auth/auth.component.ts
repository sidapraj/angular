import { AuthService,AuthResponseData } from './auth.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  preserveWhitespaces: true
})
export class AuthComponent implements OnInit {

  constructor(private auth:AuthService,private router:Router) { }

  ngOnInit(): void {
  }
  errormsg:string = null
  isLoginMode = true
  isLoading = false
  regForm:NgForm
  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode
  }
  onSubmit(form:NgForm){
    if(!form.valid){
      return ;
    }
    const email = form.value.email;
    const password = form.value.password
    let authObs:Observable<AuthResponseData>
    this.isLoading = true
    if(this.isLoginMode){
      authObs = this.auth.login(email,password)
    } else {
      authObs = this.auth.signup(email,password)
    }
    authObs.subscribe(resData=> {
      console.log(resData)
      this.isLoading = false
      this.router.navigate(['/recipes'])
    },
    error => {
      console.log(error)
     this.errormsg = error
      
      this.isLoading = false
    }
    )
   form.reset()
  }
}
