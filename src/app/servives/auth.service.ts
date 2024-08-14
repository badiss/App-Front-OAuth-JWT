import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment.development';
import { jwtDecode } from 'jwt-decode';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

 /* public users: any = {
    admin : {password: '1234', roles: ['STUDENT', 'ADMIN']},
    user1 : {password: '1234', roles: ['STUDENT']},
  }*/

  // Garder l'utilisateur authentifier
  public username: any;
  public isAuthentificated: boolean=false;
  public accessToken!: any;
  public roles: string[]= [];
  public roleUserConected!: boolean;

  constructor(private router: Router, private httpClient: HttpClient) { }

  public login(username : string, password : string) {

    let httpParams = new HttpParams()
    .append("username", username)
    .append("password", password)

    let headers = new HttpHeaders();
    headers = headers.set("Content-Type", "application/x-www-form-urlencoded");

    return this.httpClient.post(environment.backendHost+"/login", httpParams, { headers: headers });
  }

  // Récupérer les information de Token générer par le service de login
  public loadProfile(data: any) {
    this.accessToken = data['access-token'];
    this.isAuthentificated = true;
    // pour récupérer les infos dans Token: comme le role, username, ....
    let decoderJwt: any = jwtDecode(this.accessToken);
    this.username = decoderJwt.sub;
    this.roles = decoderJwt.scope;
    console.log(this.roles);
    this.getRoleUserAdmin(this.roles);
    window.localStorage.setItem("jwt-token", this.accessToken);
  }

  public logout() {
    this.isAuthentificated = false;
    this.roles = [];
    this.accessToken = undefined;
    this.username = undefined;
    // vider le localStorage
    window.localStorage.removeItem("jwt-token");
    this.router.navigateByUrl('/login');
  }

  public getRoleUserAdmin(roles: string[]) {
    if (roles.length > 0 && this.isAuthentificated && roles.includes('ADMIN')) {
      this.roleUserConected = true;
    } else {
      this.roleUserConected = false;
    }

  }

  // Récupérer le token à partir de LocalStorage, et envoyer le user vers la liste des students comme la 1ér page
  public loadJwtFromLocalStorage() {
    let token = window.localStorage.getItem("jwt-token");
    if (token) {
      this.loadProfile({"access-token": token});
      this.router.navigateByUrl("/admin/students");
    }
  }

  public restPwd(formData: any): Observable<Boolean> {
    let headers = new HttpHeaders();
    headers.set("Content-Type", "application/x-www-form-urlencoded");
    const test = {"email": "hasnibadiiiis.@gmail.com", "user": "admin"};
    return this.httpClient.post<Boolean>(environment.backendHost+"/restPasswordUser", test, { headers: headers });
  }


}
