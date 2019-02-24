import { debounceTime, tap, switchMap, finalize } from 'rxjs/operators';

import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { DataService } from './../../services/data.service';
import { Issue } from './../../models/issue';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { Customer } from '../../customer';
import { AddCustomerComponent } from '../add-customer/add-customer.component';

const credit_api = '/transaction';

@Component({
  selector: 'app-add-credit',
  templateUrl: './add-credit.component.html',
  styleUrls: ['./add-credit.component.css']
})
export class AddCreditComponent  implements OnInit{
  filteredUsers: Customer[] = [];
  creditForm: FormGroup;
  loading = false;
  public user;
  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<AddCreditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Issue,public dialog: MatDialog,
    public dataService: DataService) { }

formControl = new FormControl('', [
Validators.required
// Validators.email,
]);

ngOnInit() {
  this.user = JSON.parse(localStorage.getItem('current_user'));
  this.creditForm = this.fb.group({
    customer: null,
    amount: [''],
    due_date: [''],
  });
  // this.loadData();
  this.getCustomers();
}

getErrorMessage() {
return this.formControl.hasError('required') ? 'Required field' :
this.formControl.hasError('email') ? 'Not a valid email' :
'';
}

submit() {
// emppty stuff
}

onNoClick(): void {
this.dialogRef.close();
}

getCustomers(): void {
  this.creditForm
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

addNew(issue: Issue) {
  const dialogRef = this.dialog.open(AddCustomerComponent, {
    data: {issue: issue }
  });
}

public confirmAdd(): void {
this.dataService.addIssue(this.data);
}


onSubmit() {
  console.log(this.creditForm.getRawValue());
  this.creditForm.value.due_date = this.creditForm.value.due_date.getFullYear() + '-' + (this.creditForm.value.due_date.getMonth() + 1) +
  '-' + this.creditForm.value.due_date.getDate();
  this.loading = true;
  this.creditForm.value.transaction_type = 'CRED';
  this.creditForm.value.user_id = this.user.user_id;
  this.dataService.create(this.creditForm.value, credit_api).subscribe(
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

