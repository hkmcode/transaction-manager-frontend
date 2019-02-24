import { Customer } from './../../customer';
import { AddCustomerComponent } from './../add-customer/add-customer.component';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { DataService } from './../../services/data.service';
import { Issue } from './../../models/issue';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { Observable } from 'rxjs';
import {switchMap, debounceTime, tap, finalize} from 'rxjs/operators';


const cheque_api = '/transaction';

@Component({
  selector: 'app-add-cheque',
  templateUrl: './add-cheque.component.html',
  styleUrls: ['./add-cheque.component.css']
})
export class AddChequeComponent implements OnInit {
  filteredUsers: Customer[] = [];
  chequeForm: FormGroup;
  loading = false;
  public user;
  constructor(private fb: FormBuilder,public dialogRef: MatDialogRef<AddChequeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Issue, public dialog: MatDialog,
    public dataService: DataService) { }

formControl = new FormControl('', [
Validators.required
// Validators.email,
]);

options: string[] = ['One', 'Two', 'Three'];

getErrorMessage() {
  return this.formControl.hasError('required') ? 'Required field' :
  this.formControl.hasError('email') ? 'Not a valid email' :
  '';
}

ngOnInit() {
  this.user = JSON.parse(localStorage.getItem('current_user'));
  this.chequeForm = this.fb.group({
    customer: null,
    cheque_number: [''],
    amount: [''],
    due_date: [''],
  });
  // this.loadData();
  this.getCustomers();
}

submit() {
// emppty stuff
}

onNoClick(): void {
this.dialogRef.close();
}


addNew() {
  const dialogRef = this.dialog.open(AddCustomerComponent, {
    //data: {issue: issue }
  });
}



public confirmAdd(): void {
this.dataService.addIssue(this.data);
}

getCustomers(): void {
  this.chequeForm
  .get('customer')
  .valueChanges
  .pipe(
    debounceTime(300),
    tap(() => this.loading = true),
    switchMap(value => this.dataService.search({name: value}, 1)
    .pipe(
      finalize(() => this.loading = false),
      )
    )
  )
  .subscribe(users => this.filteredUsers = users.data);

}

displayFn(customer: Customer) {
  if (customer) { return customer.name; }
}

onSubmit() {

  console.log(this.chequeForm.value);
  this.chequeForm.value.due_date = this.chequeForm.value.due_date.getFullYear() + '-' + (this.chequeForm.value.due_date.getMonth() + 1) +
  '-' + this.chequeForm.value.due_date.getDate();
  this.loading = true;
  this.chequeForm.value.transaction_type = 'CHEQ';
  this.chequeForm.value.user_id = this.user.user_id;
  this.dataService.create(this.chequeForm.value, cheque_api).subscribe(
      data => {
          this.loading = false;
          //this.submitted = true;
         // this.cropForm.reset();
      },
      error => {
          this.loading = false;
          //this.error_message = error;
      }
  );
}

}

