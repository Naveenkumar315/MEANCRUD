import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private baseUrl: string = 'https://mean-v915.onrender.com';
  private headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {}

  createStudent(data: any) {
    return this.http.post(this.baseUrl + '/create', data, {
      headers: this.headers,
    });
  }

  getStudent() {
    return this.http.get(this.baseUrl + '/get', { headers: this.headers });
  }

  updateStudent(data: any) {
    return this.http.put(this.baseUrl + '/put', data, {
      headers: this.headers,
    });
  }

  deleteStudent(id: string) {
    return this.http.delete(this.baseUrl + '/delete/' + id, {
      headers: this.headers,
    });
  }
}
