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
          this.router.navigateByUrl("/admin");
        },
        error : err => {
          console.log(err);
        }
      }
    );
  
  }

}
