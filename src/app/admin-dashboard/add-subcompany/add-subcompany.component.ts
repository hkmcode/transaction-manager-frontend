
import { DataService } from '../../services/data.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';

const company_api = '/company';

@Component({
  selector: 'app-add-subcompany',
  templateUrl: './add-subcompany.component.html',
  styleUrls: ['./add-subcompany.component.css']
})
export class AddSubcompanyComponent implements OnInit {
  companyForm: FormGroup;
  loading = false;
  public user;
  public companies;
  constructor(private fb: FormBuilder,public dialogRef: MatDialogRef<AddSubcompanyComponent>,
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
    this.user = JSON.parse(localStorage.getItem('current_user'));
    console.log(this.user);
    this.companyForm = this.fb.group({
      company_name: [''],
      location: [''],
      phone: [''],
      parent_company_id: ['']
    });
  }

  submit(){

  }

  onSubmit() {
    console.log(this.companyForm.value);
    this.loading = true;
    this.companyForm.value.parent_company_id = this.user.company_id;
    this.dataService.create(this.companyForm.value, company_api).subscribe(
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
