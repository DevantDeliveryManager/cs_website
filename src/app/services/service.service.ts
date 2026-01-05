import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface Service {
  _id: string;
  title: string;
  thumbnail: string;
  thumbnailUrl: string;
  serviceDetail: string;
  whyChooseThisService: string;
  hotPoints: string[];
  createdAt: string;
  updatedAt?: string;
  addedBy?: string;
}

export interface ServiceResponse {
  data: Service[];
}

export interface SingleServiceResponse {
  data: Service;
}

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  private readonly servicesEndpoint = `${environment.apiBaseUrl}/get-services`;
  private readonly serviceEndpoint = `${environment.apiBaseUrl}/get-service`;

  constructor(private http: HttpClient) {}

  getAllServices(): Observable<Service[]> {
    return this.http.get<ServiceResponse>(this.servicesEndpoint).pipe(
      map(response => response.data)
    );
  }

  getServiceById(id: string): Observable<Service> {
    return this.http.get<SingleServiceResponse>(`${this.serviceEndpoint}/${id}`).pipe(
      map(response => response.data)
    );
  }
}
