
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../services/data.service';
import { AddSubcompanyComponent } from '../add-subcompany/add-subcompany.component';

const companies = '/company';


@Component({
  selector: 'app-manage-company',
  templateUrl: './manage-company.component.html',
  styleUrls: ['./manage-company.component.css']
})
export class ManageCompanyComponent implements OnInit {
  public company_dataSource;
  public user;
  displayedCompanyColumns = ['company_name', 'location', 'phone', 'actions'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private _dataService: DataService,
    public dialog: MatDialog,
    public dataService: DataService) {}

  ngOnInit() {
    this.getCompanies();
  }

  getCompanies(): void {
    this._dataService.get(companies)
        .subscribe(data => {
            this.company_dataSource = new MatTableDataSource(data['data']);
            this.company_dataSource.paginator = this.paginator;
            this.company_dataSource.sort = this.sort;
        });
}

editCompany(row: any): void {
  const dialogRef = this.dialog.open(AddSubcompanyComponent, {
      height: '100%',
      width: '100%',
      data: row
  });

  dialogRef.afterClosed().subscribe(result => {

      if (result) {
          this.getCompanies();
      }

  });
}

addCompany(row: any): void {
  const dialogRef = this.dialog.open(AddSubcompanyComponent, {
      //width: '40%',
  });

  dialogRef.afterClosed().subscribe(result => {

      if (result) {
          this.getCompanies();
      }

  });
}

}

