import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../services/data.service';
import { MatDialog, MatTableDataSource, MatSort, MatPaginator } from '@angular/material';


const cheque_daily = '/transaction-daily-unclear-user/';
const setclear_api = '/setclear/';
const collection_api = '/transaction';
const transaction_count = '/transaction-count/';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public cheque_daily_dataSource;
  public credit_daily_dataSource;
  public user;
  public total_cheque_count;
  public total_cheque_count_daily;
  public overall_credit_total;
  public daily_credit_total;
  clearmodel: any = {};

  collectionForm: FormGroup;
  displayedChequeColumns = ['customer_name', 'cheque_number', 'Amount', 'due_date', 'actions'];
  displayedCreditColumns = ['customer_name', 'Amount', 'due_date', 'actions'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _dataService: DataService,
    public dialog: MatDialog,private fb: FormBuilder,
    public dataService: DataService) {}

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('current_user'));
    console.log(this.user);
    this.getTransactionCount();
    this.getChequeTransactionsDaily();
    this.getCreditTransactionsDaily();

    this.collectionForm = this.fb.group({
      amount: ['']
    });
  }

  getTransactionCount(): void {
    let transaction_count_url = transaction_count + this.user.user_id;
  this._dataService.get(transaction_count_url)
      .subscribe(data => {
       this.total_cheque_count = data['data']['total_cheque'];
       this.total_cheque_count_daily = data['data']['daily_total_cheque'];
       this.overall_credit_total = data['data']['total_credit'];
       this.daily_credit_total = data['data']['daily_total_credit'];
      });


  }

  getChequeTransactionsDaily(): void {
    let cheque_url = cheque_daily + 'CHEQ' + '/' + this.user.user_id;
    this._dataService.get(cheque_url)
        .subscribe(data => {
            this.cheque_daily_dataSource = new MatTableDataSource(data['data']);
            this.cheque_daily_dataSource.paginator = this.paginator;
            this.cheque_daily_dataSource.sort = this.sort;
        });
}


getCreditTransactionsDaily(): void {
  let credit_url = cheque_daily + 'CRED' + '/' + this.user.user_id;
  this._dataService.get(credit_url)
      .subscribe(data => {
          this.credit_daily_dataSource = new MatTableDataSource(data['data']);
          this.credit_daily_dataSource.paginator = this.paginator;
          this.credit_daily_dataSource.sort = this.sort;
      });
}


addCollection(event) {

  console.log(this.collectionForm.value);

  this.collectionForm.value.transaction_type = 'COLL';
  this.collectionForm.value.user_id = this.user.user_id;
  //this.collectionForm.value.amount = event.target.value;
  this.dataService.create(this.collectionForm.value, collection_api).subscribe(
      data => {
        this.collectionForm.reset();
         // this.loading = false;
          //this.submitted = true;
         // this.cropForm.reset();
      },
      error => {
          //this.loading = false;
          //this.error_message = error;
      }
  );
}



applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.cheque_daily_dataSource.filter = filterValue;
    //this.credit_daily_dataSource.filter = filterValue;
}


setClear(row,e) {
  if (e.target.checked) {
    this.clearmodel.isCleared = 1;
}
else {
  this.clearmodel.isCleared = 0;
}

this.clearmodel.transaction_id = row.id;

console.log(this.clearmodel);

  this._dataService.update(this.clearmodel, setclear_api).subscribe(data => {
      //console.log(JSON.stringify(data));
      //this.getChequeTransactionsDaily();
      //this.getCreditTransactionsDaily();
  });
}

}
