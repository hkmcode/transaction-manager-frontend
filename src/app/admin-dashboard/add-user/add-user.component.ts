import { DataService } from '../../services/data.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';

const user_api = '/register';

const company_api = '/company';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  userForm: FormGroup;
  loading = false;
  public user;
  public companies;
  constructor(private fb: FormBuilder,public dialogRef: MatDialogRef<AddUserComponent>,
    @Inject(MAT_DIALOG_DATA)  public dialog: MatDialog,
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
    this.userForm = this.fb.group({
      name: [''],
      company_id: [''],
      phone: [''],
      password: ['']
    });
    this.getCompanies();
  }

  getCompanies(): void {
    this.dataService.get(company_api)
        .subscribe(data => {
            this.companies = data['data'];
        });
}

submit(){

}

  onSubmit() {
    console.log(this.userForm.value);
    this.loading = true;
    this.dataService.create(this.userForm.value, user_api).subscribe(
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
