import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListCoursComponent } from './list-cours/list-cours.component';
import { AddCoursComponent } from './add-cours/add-cours.component';
import { AffectationStudentCoursComponent } from './affectation-student-cours/affectation-student-cours.component';

const routes: Routes = [
  {
    path: '', 
    children : [
      { 
        path: '', 
        component: ListCoursComponent 
      },
      { 
        path: "add-cours", 
        component: AddCoursComponent 
      },
      { 
        path: "affectation-student-cours", 
        component: AffectationStudentCoursComponent 
      },
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursRoutingModule { }
