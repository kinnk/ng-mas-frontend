import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public URI = 'http://localhost:9090/api'; 

  constructor() { }
}
