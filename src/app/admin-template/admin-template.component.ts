import { Component } from '@angular/core';
import { AuthService } from '../servives/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-template',
  templateUrl: './admin-template.component.html',
  styleUrl: './admin-template.component.css'
})
export class AdminTemplateComponent {

  constructor(public authService: AuthService, public router: Router) {

  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl("/login");
  }

  changeLang(lang: string) {

    if (lang === 'fr') {
      localStorage.setItem('locale', 'fr');
    }

    if (lang === 'en') {
      localStorage.setItem('locale', 'en');
    }

    if (lang === 'ar') {
      localStorage.setItem('locale', 'ar');
    }
  }
}
