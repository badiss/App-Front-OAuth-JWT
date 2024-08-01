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
   * List des cours.
   */
  public getListCours(): Observable<Array<Cours>> {
    return this.httpClient.get<Array<Cours>>(environment.backendHost+"/listCours");
  }

  public ajouterCour(formData: any): Observable<Cours> {
    return this.httpClient.post<Cours>(environment.backendHost+"/addCour", formData);
  }
}
