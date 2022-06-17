import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Car } from '../models/Car';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  URL = `${environment.baseUrl}/api`;

  constructor(private http: HttpClient) { }

  postCar(car: Car) {
    return this.http.post(`${this.URL}/Car`, car);
  }

  putCar(car: any, id: Number) {
    return this.http.put<any>(`${this.URL}/Car/${id}`, car);
  }

  getAllCar() {
    return this.http.get<any>(`${this.URL}/Car`);
  }

  deleteCar(id: number) {
    return this.http.delete<any>(`${this.URL}/Car/${id}`);
  }


}
