import { Component, OnInit, ViewChild } from '@angular/core';
import { StudentService } from '../servives/student.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Student } from '../model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrl: './students.component.css'
})
export class StudentsComponent implements OnInit {

  public students! : Array<Student>;
  public dataSource : any;
  public displayedColumns: string[] = ['studentId', 'code', 'firstName', 'programId', 'photo', 'action'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private studentService: StudentService, private router: Router) {}

  ngOnInit(): void {
    this.studentService.getListStudent().subscribe({
      next : data => {
        this.students = data;
        this.dataSource = new MatTableDataSource(this.students);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error : err => {
        console.log(err);
      }
    });
  }

  studentPayments(student : Student) {
    this.router.navigateByUrl('/admin/student-details/'+student.code);
  }

}
