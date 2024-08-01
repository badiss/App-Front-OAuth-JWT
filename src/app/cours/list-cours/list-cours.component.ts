import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Cours } from '../../model';
import { CourService } from '../../servives/cour.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from '../../servives/auth.service';

@Component({
  selector: 'app-list-cours',
  templateUrl: './list-cours.component.html',
  styleUrl: './list-cours.component.css'
})
export class ListCoursComponent implements OnInit {

  public showStudents: boolean = false;
  public infosCoursSearch: any = null;
  isAdmin!: boolean;
  public cours! : Array<Cours>;
  public dataSource : any;
  public displayedColumns: string[] = ['idCours', 'titre', 'date', 'heure', 'obligatoire', 'action'];

  public dataSourceStudent : any;
  public displayedColumnsStudent: string[] = ['firstName', 'lastName', 'code', 'email'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private courService: CourService, private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.isAdmin = this.authService.roleUserConected;
    this.courService.getListCours().subscribe({
      next : data => {
        this.cours = data;
        this.dataSource = new MatTableDataSource(this.cours);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error : err => {
        console.log(err);
      }
    });
  }

  consulterStudent(ele: Cours) {
    this.infosCoursSearch = ele;
    this.showStudents = true;

    this.dataSourceStudent = new MatTableDataSource(ele.students);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  cancelStudents() {
    this.showStudents = false;
  }

  addCours() {
    this.router.navigateByUrl('admin/cours/add-cours');
  }

  affectationStudentCours() {
    this.router.navigateByUrl('admin/cours/affectation-student-cours');
  }

}
