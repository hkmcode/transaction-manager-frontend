import { DataService } from './services/data.service';
import { Component, OnInit } from '@angular/core';

const transaction_types = '/transaction-type';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'Transactions';
  types: any[];


constructor(private _dataService: DataService) {
}

ngOnInit() {
  //this.getTransactioTypes();
}

getTransactioTypes(): void {
  this._dataService.getAll(transaction_types)
      .subscribe(types => this.types = types['data']);
}
}
