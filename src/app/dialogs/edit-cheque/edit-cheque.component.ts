import { Customer } from './../../customer';
import { debounceTime, tap, switchMap, finalize } from 'rxjs/operators';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Component, Inject, OnInit} from '@angular/core';
import {DataService} from '../../services/data.service';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';

const cheque_api = '/transaction/';

@Component({
  selector: 'app-edit-cheque',
  templateUrl: './edit-cheque.component.html',
  styleUrls: ['./edit-cheque.component.css']
})
export class EditChequeComponent implements OnInit {
  filteredUsers: Customer[] = [];
  chequeForm: FormGroup;
  loading = false;
  constructor(private fb: FormBuilder,public dialogRef: MatDialogRef<EditChequeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public dataService: DataService) { }

    formControl = new FormControl('', [
      Validators.required
      // Validators.email,
      ]);

  ngOnInit() {


    this.chequeForm = this.fb.group({
      customer: null,
      cheque_number: [''],
      amount: [''],
      due_date: [''],
    });
  this.chequeForm.setValue({
    customer: this.data.customer,
    cheque_number: this.data.cheque_number,
    amount: this.data.Amount,
    due_date: this.data.due_date,
  });
  this.getCustomers();
  //this.displayFn(this.data.customer);
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
     console.log(this.chequeForm.value);
    var update_url = cheque_api + this.data.id;
    this.loading = true;
    this.chequeForm.value.due_date = this.chequeForm.value.due_date.getFullYear() + '-' + (this.chequeForm.value.due_date.getMonth() + 1) +
    '-' + this.chequeForm.value.due_date.getDate();
    this.chequeForm.value.transaction_type = 'CHEQ';
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
