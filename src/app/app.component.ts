import { Component, OnInit } from '@angular/core';
import { AuthService } from './servives/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'frontend-ang-app';

  constructor(private authService: AuthService){

  }

  ngOnInit(): void {
    // Récupérer le token à partir de LocalStorage, et envoyer le user vers la liste des students comme la 1ér page
    this.authService.loadJwtFromLocalStorage();
  }
}
