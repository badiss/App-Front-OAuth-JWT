import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { LoadStudentsComponent } from './load-students/load-students.component';
import { LoadPaymentsComponent } from './load-payments/load-payments.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { StudentsComponent } from './students/students.component';
import { PaymentsComponent } from './payments/payments.component';
import { AdminTemplateComponent } from './admin-template/admin-template.component';
import { AuthGuard } from './guards/auth.guard';
import { AuthorizationGuard } from './guards/authorization.guard';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { AddPaymentComponent } from './add-payment/add-payment.component';
import { PaymentDetailsComponent } from './payment-details/payment-details.component';

const routes: Routes = [
  { path: "", component: LoginComponent },
  { path: "login", component: LoginComponent },
  { path: "admin", component: AdminTemplateComponent, 
    canActivate : [AuthGuard],
    children : [
      { path: "home", component: HomeComponent },
      { path: "profile", component: ProfileComponent },
      { 
        path: "loadStudents", 
        component: LoadStudentsComponent, 
        canActivate : [AuthorizationGuard],
        data : { roles : ['ADMIN'] }
      },
      { 
        path: "loadPayments", 
        component: LoadPaymentsComponent,
        canActivate : [AuthorizationGuard],
        data : { roles : ['ADMIN'] }
      },
      { path: "dashbord", component: DashbordComponent },
      { path: "students", component: StudentsComponent },
      { path: "payments", component: PaymentsComponent },
      { path: "student-details/:code", component: StudentDetailsComponent },
      { 
        path: "add-payment/:code/:idPayment", 
        component: AddPaymentComponent,  
        pathMatch: 'full',
        //canActivate : [AuthorizationGuard],
        //data : { roles : ['ADMIN', 'USER'] }
      },
      { path: "payment-details/:id", component: PaymentDetailsComponent },
      {
        path: 'cours',
        loadChildren: () => import('./cours/cours-routing.module').then(module => module.CoursRoutingModule),
      },
      {
        path: 'factures',
        loadChildren: () => import('./factures/factures-routing.module').then(module => module.FacturesRoutingModule),
      }

  ] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
