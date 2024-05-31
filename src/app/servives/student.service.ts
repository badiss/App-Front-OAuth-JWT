import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Student } from '../model';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private httpClient: HttpClient) { }


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
}
