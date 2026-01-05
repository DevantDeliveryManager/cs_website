import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface ContactRequest {
  name: string;
  subject: string;
  email: string;
  phone: string;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private readonly contactEndpoint = `${environment.apiBaseUrl}/saveContactUs`;

  constructor(private http: HttpClient) {}

  submitContact(payload: ContactRequest): Observable<ContactRequest> {
    return this.http.post<ContactRequest>(this.contactEndpoint, payload);
  }
}
