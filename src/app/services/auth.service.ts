import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { Observable, catchError, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
private token: string = '';
  constructor(
    private http: HttpClient,
    private data: DataService
  ) { }

  signup(){

  }

  signin(user: any): Observable<{token: string}>{
    return this.http.post<{token: string}>(`${this.data.URI}/auth/signin`, user)
      .pipe(
        tap(({token}) => {
          localStorage.setItem('auth-token', token);
          this.setToken(token);
        }),
        catchError((error)=>{
          console.error(error)
          return [];
        })
      );
  }

  getToken(){
    return this.token;
  }

  setToken(token: string){
    this.token = token;
  }

  isAuthenticated(): boolean{
    return !!this.token;
  }

  logout(){
    this.setToken('');
    localStorage.clear();
  }
}
