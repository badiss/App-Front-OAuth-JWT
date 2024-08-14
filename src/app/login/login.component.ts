import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { AuthService } from '../servives/auth.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  public loginForm!: FormGroup;
  public resetMdpForm!: FormGroup;
  public openBlocReset: boolean = false;
  public msg_sucess_reset_mdp: boolean = false;
  public formData: any = {};

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router){

  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: this.fb.control(''),
      password: this.fb.control('')
    });
  }

  login() {
    let username = this.loginForm.value.username;
    let password = this.loginForm.value.password;
    this.authService.login(username, password).subscribe(
      {
        next : data => {
          // Récupérer les information de Token générer par le service
          this.authService.loadProfile(data);
          this.router.navigateByUrl("/admin/home");
        },
        error : err => {
          console.log(err);
        }
      }
    );
  
  }

  openFormReset() {
    this.openBlocReset = !this.openBlocReset;
    this.resetMdpForm = this.fb.group({
      user: this.fb.control(''),
      email: this.fb.control('')
    });

  }

  cancelFormReset() {
    this.msg_sucess_reset_mdp = false;
    this.openBlocReset = !this.openBlocReset;
  }

  sendResetPwd() {
    this.formData.user = this.resetMdpForm.value.user;
    this.formData.email = this.resetMdpForm.value.email;
    this.authService.restPwd(this.formData).subscribe(
      {
        next : data => {
          console.log(data);
          this.msg_sucess_reset_mdp = true;
        },
        error : err => {
          console.log(err);
        }
      }
    );
  }

}
