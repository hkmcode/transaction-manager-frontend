import { FormControl, Validators } from '@angular/forms';
import { Issue } from './../../models/issue';
import { DataService } from './../../services/data.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

const customer_api = '/customer';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {
  loading = false;
    submitted = false;
    model: any = {};
    public error_message;

constructor(public dialogRef: MatDialogRef<AddCustomerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Issue,
    public dataService: DataService) { }

    formControl = new FormControl('', [
      Validators.required
      // Validators.email,
      ]);

getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' :
      this.formControl.hasError('email') ? 'Not a valid email' :
      '';
}

  ngOnInit() {
  }

  onNoClick(): void {
        this.dialogRef.close();
    }

  onSubmit() {
    this.loading = true;
    this.dataService.create(this.model, customer_api).subscribe(
        data => {
            this.loading = false;
            this.submitted = true;
           // this.cropForm.reset();
        },
        error => {
            this.loading = false;
            this.error_message = error;
        }
    );
}


}
