import { ManageCompanyComponent } from './admin-dashboard/manage-company/manage-company.component';
import { ManageUserComponent } from './admin-dashboard/manage-user/manage-user.component';
import { SettingsComponent } from './admin-dashboard/settings/settings.component';
import { RoleGuard } from './guards/role.guard';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { LogoutComponent } from './logout/logout.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManageChequeComponent } from './manage-cheque/manage-cheque.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageCreditComponent } from './manage-credit/manage-credit.component';
import { ManageCollectionComponent } from './manage-collection/manage-collection.component';
import { Routes, RouterModule } from '@angular/router';
import { AppLayoutComponent } from './app-layout/app-layout.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AddUserComponent } from './admin-dashboard/add-user/add-user.component';


// const routes: Routes = [
//   { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
//   { path: 'login', component: LoginComponent },
//   { path: 'dashboard', component: DashboardComponent },
//   { path: 'cheque', component: ManageChequeComponent },
//   { path: 'credit', component: ManageCreditComponent },
//   { path: 'collection', component: ManageCollectionComponent }
// ];




const routes: Routes = [


    // App routes goes here here
    {
        path: '',
        component: AppLayoutComponent,
        children: [
          { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
          { path: 'dashboard', component: DashboardComponent },
          { path: 'cheque', component: ManageChequeComponent },
          { path: 'credit', component: ManageCreditComponent },
          { path: 'collection', component: ManageCollectionComponent }
        ]
    },

     // admin dashboard routes
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [RoleGuard],
    children: [
      {
        path: 'user',
        component: ManageUserComponent,
        pathMatch: 'full'
    },
    {
      path: 'company',
      component: ManageCompanyComponent,
      pathMatch: 'full'
  },
    {
      path: 'settings',
      component: SettingsComponent,
      pathMatch: 'full'
  },

      { path: 'admin', component: AdminDashboardComponent},

      // { path: 'user', component: AddUserComponent},
    ]
},

    //no layout routes
    { path: 'login', component: LoginComponent},
    { path: 'logout', component: LogoutComponent},
    //{ path: 'register', component: RegisterComponent },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, { useHash: true })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
