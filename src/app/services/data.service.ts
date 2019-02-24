import { Customer, ICustomerResponse } from './../customer';
import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {Issue} from '../models/issue';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { catchError, tap, retry, map } from 'rxjs/operators';

@Injectable()
export class DataService {
  private readonly API_URL = 'http://localhost:8000/api';

  dataChange: BehaviorSubject<Issue[]> = new BehaviorSubject<Issue[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;

  constructor (private httpClient: HttpClient) {}

  get data(): Issue[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  /** CRUD METHODS */
  getAllIssues(): void {
    this.httpClient.get<Issue[]>(this.API_URL).subscribe(data => {
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
      console.log (error.name + ' ' + error.message);
      });
  }

  // DEMO ONLY, you can find working methods below
  addIssue (issue: Issue): void {
    this.dialogData = issue;
  }

  updateIssue (issue: Issue): void {
    this.dialogData = issue;
  }

  deleteIssue (id: number): void {
    console.log(id);
  }

  getAll(URI): Observable<any[]> {
    return this.httpClient.get<any[]>(this.API_URL + URI);
}

  get(URI): Observable<any[]> {
    return this.httpClient.get<any[]>(this.API_URL + URI)
        .pipe(
        catchError(this.handleError('get', []))
        );
}

search(filter: {name: string} = {name: ''}, page = 1): Observable<ICustomerResponse> {
  return this.httpClient.get<ICustomerResponse>(this.API_URL + '/customer/')
  .pipe(
    tap((response: ICustomerResponse) => {
      response.data = response.data
        .map(customer => new Customer(customer.id, customer.name, customer.phone))
        // Not filtering in the server since in-memory-web-api has somewhat restricted api
        .filter(user => user.name.includes(filter.name));

      return response;
    })
    );
}

create(model: any, URI): Observable<Response> {
  return this.httpClient.post<Response>(this.API_URL + URI, model)
      .pipe(
        catchError(this.handleError('create', model)),
  );
}

update(data: any, URI): Observable<any[]> {
  return this.httpClient.put<any[]>(this.API_URL + URI, data)
      .pipe(
      catchError(this.handleError("update", []))
      );
}

private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {
      const errors = error['error'];
      const type = errors.errors;
      return throwError(type);
  };
}

}





/* REAL LIFE CRUD Methods I've used in my projects. ToasterService uses Material Toasts for displaying messages:

    // ADD, POST METHOD
    addItem(kanbanItem: KanbanItem): void {
    this.httpClient.post(this.API_URL, kanbanItem).subscribe(data => {
      this.dialogData = kanbanItem;
      this.toasterService.showToaster('Successfully added', 3000);
      },
      (err: HttpErrorResponse) => {
      this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
    });
   }

    // UPDATE, PUT METHOD
     updateItem(kanbanItem: KanbanItem): void {
    this.httpClient.put(this.API_URL + kanbanItem.id, kanbanItem).subscribe(data => {
        this.dialogData = kanbanItem;
        this.toasterService.showToaster('Successfully edited', 3000);
      },
      (err: HttpErrorResponse) => {
        this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
      }
    );
  }

  // DELETE METHOD
  deleteItem(id: number): void {
    this.httpClient.delete(this.API_URL + id).subscribe(data => {
      console.log(data['']);
        this.toasterService.showToaster('Successfully deleted', 3000);
      },
      (err: HttpErrorResponse) => {
        this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
      }
    );
  }
*/




