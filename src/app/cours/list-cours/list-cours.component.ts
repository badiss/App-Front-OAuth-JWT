import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Cours } from '../../model';
import { CourService } from '../../servives/cour.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-list-cours',
  templateUrl: './list-cours.component.html',
  styleUrl: './list-cours.component.css'
})
export class ListCoursComponent implements OnInit {

  public cours! : Array<Cours>;
  public dataSource : any;
  public displayedColumns: string[] = ['idCours', 'titre', 'date', 'heure', 'obligatoire', 'action'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private courService: CourService, private router: Router) {}

  ngOnInit(): void {
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

  }

}
