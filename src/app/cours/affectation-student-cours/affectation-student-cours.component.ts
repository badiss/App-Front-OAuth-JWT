import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CourService } from '../../servives/cour.service';
import { StudentService } from '../../servives/student.service';
import { Cours, Student } from '../../model';

@Component({
  selector: 'app-affectation-student-cours',
  templateUrl: './affectation-student-cours.component.html',
  styleUrl: './affectation-student-cours.component.css'
})
export class AffectationStudentCoursComponent implements OnInit {

  public affectationFormGroup!: FormGroup;
  showProgress: boolean = false;
  public students! : Array<Student>;
  public cours! : Array<Cours>;

  constructor(private activatedRoute: ActivatedRoute, private fb: FormBuilder, 
    private courService: CourService, private router: Router, private studentService: StudentService) {

  }

  ngOnInit(): void {
    this.getListStudent();
    this.getListCours();
    this.affectationFormGroup = this.fb.group({
      studentId: this.fb.control(''),
      courId: this.fb.control(''),
    });
  }

  getListStudent() {
    this.studentService.getListStudent().subscribe({
      next : data => {
        this.students = data;
      },
      error : err => {
        console.log(err);
      }
    });
  }

  getListCours() {
    this.courService.getListCours().subscribe({
      next : data => {
        this.cours = data;
      },
      error : err => {
        console.log(err);
      }
    });
  }

  affectation() {
    console.log(this.affectationFormGroup.value);
  }

}
