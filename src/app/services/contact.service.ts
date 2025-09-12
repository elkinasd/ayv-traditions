import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment'; 
import { email } from '../interfaces/email.interface'

@Injectable({
  providedIn: 'root'
})
export class ContactService {

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
    terms: false
  };

  constructor(private http: HttpClient) { }

  sendMail(formData: email): Observable<any> {
    return this.http.post(`${this.baseUrl}${this.urlContact}`, formData, { headers: this.headers });
  }
}
