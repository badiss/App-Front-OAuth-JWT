import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cours } from '../model';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CourService {

  constructor(private httpClient: HttpClient) { }

  /**
   * List de étudiant.
   */
  public getListCours(): Observable<Array<Cours>> {
    return this.httpClient.get<Array<Cours>>(environment.backendHost+"/listCours");
  }
}
