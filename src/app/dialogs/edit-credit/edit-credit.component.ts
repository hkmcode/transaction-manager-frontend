import { Customer } from './../../customer';
import { debounceTime, tap, switchMap, finalize } from 'rxjs/operators';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Component, Inject, OnInit} from '@angular/core';
import {DataService} from '../../services/data.service';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';

const credit_api = '/transaction/';

@Component({
  selector: 'app-edit-credit',
  templateUrl: './edit-credit.component.html',
  styleUrls: ['./edit-credit.component.css']
})
export class EditCreditComponent implements OnInit {
  filteredUsers: Customer[] = [];
  chequeForm: FormGroup;
  loading = false;
  constructor(private fb: FormBuilder,public dialogRef: MatDialogRef<EditCreditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public dataService: DataService) { }

    formControl = new FormControl('', [
      Validators.required
      // Validators.email,
      ]);

  ngOnInit() {

console.log(this.data.customer);
  this.chequeForm = this.fb.group({
    customer: this.data.customer,
    cheque_number:this.data.cheque_number,
    Amount: this.data.Amount,
    due_date:this.data.due_date,
  });
  this.getCustomers();
  this.displayFn(this.data.customer);
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

  stopEdit(): void {
    this.dataService.updateIssue(this.data);
  }

  onSubmit() {
    console.log(this.chequeForm.getRawValue());
    var update_url = credit_api + this.data.id;
    this.loading = true;
    this.chequeForm.value.due_date = this.chequeForm.value.due_date.getFullYear() + '-' + (this.chequeForm.value.due_date.getMonth() + 1) +
    '-' + this.chequeForm.value.due_date.getDate();
    this.chequeForm.value.transaction_type = 'CRED';
    this.chequeForm.value.user_id = 1;
    this.dataService.update(this.chequeForm.value, update_url).subscribe(
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

