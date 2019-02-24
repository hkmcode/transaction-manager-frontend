import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../services/data.service';
import { AddUserComponent } from '../add-user/add-user.component';

const users = '/users';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.css']
})
export class ManageUserComponent implements OnInit {
  public user_dataSource;
  public user;
  displayedUserColumns = ['name', 'company_name', 'phone', 'actions'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private _dataService: DataService,
    public dialog: MatDialog,
    public dataService: DataService) {}

  ngOnInit() {
    this.getUsers();
  }

  getUsers(): void {
    this._dataService.get(users)
        .subscribe(data => {
            this.user_dataSource = new MatTableDataSource(data['data']);
            this.user_dataSource.paginator = this.paginator;
            this.user_dataSource.sort = this.sort;
        });
}

editUser(row: any): void {
  const dialogRef = this.dialog.open(AddUserComponent, {
      height: '70%',
      width: '40%',
      data: row
  });

  dialogRef.afterClosed().subscribe(result => {

      if (result) {
          this.getUsers();
      }

  });
}

addUser(): void {
  const dialogRef = this.dialog.open(AddUserComponent, {
      height: '70%',
      width: '40%',
  });

  dialogRef.afterClosed().subscribe(result => {

      if (result) {
          this.getUsers();
      }

  });
}


applyFilter(filterValue: string) {
  filterValue = filterValue.trim(); // Remove whitespace
  filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
  this.user_dataSource.filter = filterValue;
  //this.credit_daily_dataSource.filter = filterValue;
}

}
