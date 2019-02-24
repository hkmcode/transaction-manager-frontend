import { MatDialog } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { AddSubcompanyComponent } from '../add-subcompany/add-subcompany.component';
import { DataService } from '../../services/data.service';
import { Issue } from '../../models/issue';
import { AddUserComponent } from '../add-user/add-user.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor( public dialog: MatDialog, public dataService: DataService) { }

  ngOnInit() {
  }



  addSubCompany() {
    const dialogRef = this.dialog.open(AddSubcompanyComponent, {
     // data: {issue: issue }
    });
  }

  addUser() {
    const dialogRef = this.dialog.open(AddUserComponent, {
     // data: {issue: issue }
    });
  }

}
