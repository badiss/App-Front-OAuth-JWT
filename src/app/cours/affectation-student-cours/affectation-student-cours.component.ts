import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CourService } from '../../servives/cour.service';
import { StudentService } from '../../servives/student.service';
import { AffectationStudentCoursDTO, Cours, Student } from '../../model';

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
  public formData: any = {};
   

  constructor(private activatedRoute: ActivatedRoute, private fb: FormBuilder, 
    private courService: CourService, private router: Router, private studentService: StudentService) {

  }

  ngOnInit(): void {
    this.getListStudent();
    this.getListCours();
    this.affectationFormGroup = this.fb.group({
      studentId: this.fb.control(''),
      coursIds: this.fb.control(''),
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
    this.showProgress = true;
    // créer un objet FormData pour l'envoyer après comme param.
    this.formData.coursIds = this.affectationFormGroup.value.coursIds;
    this.formData.studentId = this.affectationFormGroup.value.studentId;

    this.studentService.affectationStudentCours(this.formData).subscribe({
      next : value => {
        this.showProgress = false;
        alert('Affectation saved Successfully');
        this.router.navigateByUrl('/admin/cours');
      },
      error : err => {
        console.log(err);
      }
    });
  }

  SelectedStudent(studentId: number) {
    this.cours.forEach(function (value) {
      value.disabledCour = false;
      value.students.forEach(function (ele) {
        if (ele.studentId === studentId) {
          value.disabledCour = true;
          return;
        }
      });
    });
  }

}
