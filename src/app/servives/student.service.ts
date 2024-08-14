import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Student } from '../model';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class StudentService {


  constructor(private httpClient: HttpClient) {
   }


  /**
   * List de étudiant.
   */
  public getListStudent(): Observable<Array<Student>> {
    return this.httpClient.get<Array<Student>>(environment.backendHost+"/listStudent");
  }

  /**
   * Récupérer les infos d'un étudiant par code.
   */
  public getStudentWithCode(code: string): Observable<Student> {
    return this.httpClient.get<Student>(environment.backendHost+"/student/"+code);
  }

  /**
   * Affectation d'un étudiant a un ou plusieurs cours.
   */
  public affectationStudentCours(formData: any): Observable<Student> {
    let headers = new HttpHeaders();
    headers.set("Content-Type", "application/json");
    return this.httpClient.post<Student>(environment.backendHost+"/affectation", formData, { headers: headers });
  }

}
