import { JwtInterceptor } from './helpers/jwt.interceptor';
import { AuthGuard } from './guards/auth.guard';
import { DateFormat } from './date-format';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {
  MatButtonModule, MatDialogModule, MatIconModule, MatInputModule, MatPaginatorModule, MatSortModule,
  MatTableModule, MatToolbarModule, MatSelectModule, MatSidenavModule, MatListModule, MatAutocompleteModule,
  MatProgressSpinnerModule, MatDatepickerModule, MatNativeDateModule, DateAdapter, MatCardModule
} from '@angular/material';
import {DataService} from './services/data.service';
import {AddDialogComponent} from './dialogs/add/add.dialog.component';
import {EditDialogComponent} from './dialogs/edit/edit.dialog.component';
import {DeleteDialogComponent} from './dialogs/delete/delete.dialog.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AddCollectionComponent } from './dialogs/add-collection/add-collection.component';
import { AddCreditComponent } from './dialogs/add-credit/add-credit.component';
import { AddChequeComponent } from './dialogs/add-cheque/add-cheque.component';
import { ManageChequeComponent } from './manage-cheque/manage-cheque.component';
import { ManageCreditComponent } from './manage-credit/manage-credit.component';
import { ManageCollectionComponent } from './manage-collection/manage-collection.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavigationComponent } from './navigation/navigation.component';
import { AddCustomerComponent } from './dialogs/add-customer/add-customer.component';
import { EditChequeComponent } from './dialogs/edit-cheque/edit-cheque.component';
import { EditCreditComponent } from './dialogs/edit-credit/edit-credit.component';
import { LoginComponent } from './login/login.component';
import { AppLayoutComponent } from './app-layout/app-layout.component';
import { LogoutComponent } from './logout/logout.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { AdminNavigationComponent } from './navigation/admin-navigation/admin-navigation.component';
import { AddSubcompanyComponent } from './admin-dashboard/add-subcompany/add-subcompany.component';
import { AddUserComponent } from './admin-dashboard/add-user/add-user.component';
import { SettingsComponent } from './admin-dashboard/settings/settings.component';
import { ManageUserComponent } from './admin-dashboard/manage-user/manage-user.component';
import { ManageCompanyComponent } from './admin-dashboard/manage-company/manage-company.component';




@NgModule({
  declarations: [
    AppComponent,
    AddDialogComponent,
    EditDialogComponent,
    DeleteDialogComponent,
    AddChequeComponent,
    AddCreditComponent,
    AddCollectionComponent,
    ManageChequeComponent,
    ManageCreditComponent,
    ManageCollectionComponent,
    DashboardComponent,
    NavigationComponent,
    AddCustomerComponent,
    EditChequeComponent,
    EditCreditComponent,
    LoginComponent,
    AppLayoutComponent,
    LogoutComponent,
    AdminDashboardComponent,
    AdminLayoutComponent,
    AdminNavigationComponent,
    AddSubcompanyComponent,
    AddUserComponent,
    SettingsComponent,
    ManageUserComponent,
    ManageCompanyComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatDialogModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatSortModule,
    MatTableModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatSelectModule,
    MatSidenavModule,
    MatListModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  entryComponents: [
    AddDialogComponent,
    EditDialogComponent,
    DeleteDialogComponent,
    AddChequeComponent,
    AddCreditComponent,
    AddCollectionComponent,
    AddCustomerComponent,
    EditChequeComponent,
    EditCreditComponent,
    AddSubcompanyComponent,
    AddUserComponent
  ],
  providers: [
    DataService,
    AuthGuard,
    { provide: DateAdapter, useClass: DateFormat },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
