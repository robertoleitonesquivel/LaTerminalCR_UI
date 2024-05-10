import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Cities } from '../interfaces/cities.interface';
import { Observable } from 'rxjs';
import { DetailCities } from '../interfaces/detail-cities.interface';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {

  private readonly baseUrl: string = environment.ApiUrl;

  constructor(private http: HttpClient) { }

  GetCities(): Observable<Cities[]> {
    return this.http.get<Cities[]>(`${this.baseUrl}api/Cities`);
  }

  GetDetailCities(_di: string): Observable<DetailCities> {
    return this.http.get<DetailCities>(`${this.baseUrl}api/Cities/GetDetail?id=${_di}`);
  }

}
