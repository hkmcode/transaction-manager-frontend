import { AddCollectionComponent } from './../dialogs/add-collection/add-collection.component';
import { AddChequeComponent } from './../dialogs/add-cheque/add-cheque.component';
import { DataSource } from '@angular/cdk/collections';
import { DeleteDialogComponent } from './../dialogs/delete/delete.dialog.component';
import { EditDialogComponent } from './../dialogs/edit/edit.dialog.component';
import { AddDialogComponent } from './../dialogs/add/add.dialog.component';
import { Issue } from './../models/issue';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {DataService} from './../services/data.service';
import {HttpClient} from '@angular/common/http';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import {BehaviorSubject, fromEvent, merge, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

const transactions = '/transaction-abbr/';

@Component({
  selector: 'app-manage-collection',
  templateUrl: './manage-collection.component.html',
  styleUrls: ['./manage-collection.component.css']
})
export class ManageCollectionComponent implements OnInit {

  displayedColumns = ['id', 'Amount','created_at'];
  exampleDatabase: DataService | null;
  //dataSource: ExampleDataSource | null;
  public dataSource;
  index: number;
  id: number;

  constructor(public httpClient: HttpClient,
    public dialog: MatDialog,
    public dataService: DataService) {}

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;


  ngOnInit() {
    //this.loadData();
    this.getTransactions();
  }

  refresh() {
    //this.loadData();
  }

  getTransactions(): void {
    const transaction_url = transactions + 'COLL';
    this.dataService.get(transaction_url)
        .subscribe(data => {
            this.dataSource = new MatTableDataSource(data['data']);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        });
}
}


