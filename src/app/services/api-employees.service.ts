import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, shareReplay } from 'rxjs';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})

export class ApiEmployeesService {

  constructor(
    private http: HttpClient,
    private data: DataService
  ) { }

  createEmployee(newEmployee: any): Observable<any>{
    return this.http.post<any>(`${this.data.URI}/employees`, newEmployee)
    .pipe(catchError(error => {
      console.error('Request error:', error);
      return of(null);
      }));
  }
  // Метод отправки запроса на обновление сотрудника
  updateEmployee(updatedEmployee: any, employeeId: string): Observable<any>{
    return this.http.patch<any>(`${this.data.URI}/employees/${employeeId}`, updatedEmployee)
      .pipe(catchError(error => {
        console.error('Error sending data:', error);
        return of(null);
      }));
  }

  getAllDepartments(): Observable<any> {
    return this.http.get<any>(this.data.URI + '/departments/all').pipe( 
      catchError(error => {
        console.error('Error fetching data:', error);
        return of(null); // Возвращаем пустой Observable в случае ошибки
    }),
    shareReplay(1))
  }

  getAllEmployees(): Observable<any> {
    return this.http.get<any>(this.data.URI + '/employees/all').pipe( 
      catchError(error => {
        console.error('Error fetching data:', error);
        return of(null); 
    }))
  }
}
