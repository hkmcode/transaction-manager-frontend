import { FormControl, Validators } from '@angular/forms';
import { DataService } from './../../services/data.service';
import { Issue } from './../../models/issue';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-add-collection',
  templateUrl: './add-collection.component.html',
  styleUrls: ['./add-collection.component.css']
})
export class AddCollectionComponent {

  constructor(public dialogRef: MatDialogRef<AddCollectionComponent>,
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

submit() {
// emppty stuff
}

onNoClick(): void {
this.dialogRef.close();
}

public confirmAdd(): void {
this.dataService.addIssue(this.data);
}

}

