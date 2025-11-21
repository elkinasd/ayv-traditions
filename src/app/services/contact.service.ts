import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { email } from '../interfaces/email.interface';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private http = inject(HttpClient);

  baseUrl = `${environment.baseUrl}`;
  urlContact = `${environment.mail.contact}`;
  headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  formData: email = {
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    issue: '',
    channel: '',
    request: '',
    terms: false,
  };

  sendMail(formData: email): Observable<unknown> {
    return this.http.post(`${this.baseUrl}${this.urlContact}`, formData, { headers: this.headers });
  }
}
