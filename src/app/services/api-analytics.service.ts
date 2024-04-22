import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiAnalyticsTsService {

  constructor(
    private http: HttpClient,
    private data: DataService
  ) {}

  getExpensesByCategory(): Observable<any>{
    return this.http.get<any>(`${this.data.URI}/finances/expensesByCategory`)
      .pipe(
        map((result) => {
          return result.map( (item: { category: any; total_expense: any; }) => ({
            name: item.category,
            value: item.total_expense
          }));
        }),
        catchError((error)=>{
          console.error('Something wrong:', error);
          return of(null);
        })
      )
  }
 
  getRevenuesBySource(): Observable<any>{
    return this.http.get<any>(`${this.data.URI}/finances/revenuesBySource`)
      .pipe(
        map((result) => {
          return result.map((item: { source: any; total_revenue: any; }) => ({
            name: item.source,
            value: item.total_revenue
          }));
        }),
        catchError((error)=>{
          console.error('Something wrong:', error);
          return of(null);
        })
      )
  }
  getFinancesResults(): Observable<any>{
    return this.http.get<any>(`${this.data.URI}/finances/result`)
      .pipe(
        map((result) => result.result),
        catchError((error)=>{
          console.error('Something wrong:', error);
          return of(null);
        })
      )
  }
}
