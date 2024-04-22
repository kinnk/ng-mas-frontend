import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiFinancesService {

  constructor(
    private http: HttpClient,
    private data: DataService
  ) { }


  getRevenuesExpenses(){
    return this.http.get<any>(`${this.data.URI}/finances/revenues&expenses`)
        .pipe(
          catchError((error)=>{
            console.error('Something wrong:', error);
            return of(null);
          })
        )
  }
  // getAllRevenues(): Observable<any>{
  //   return this.http.get<any>(`${this.data.URI}/finances/revenues`)
  //     .pipe(
  //       catchError((error)=>{
  //         console.error('Something wrong:', error);
  //         return of(null);
  //       })
  //     )
  // }
}
