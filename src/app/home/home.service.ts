import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  editAddress(formData: FormData) {
    return this.http.post('http://localhost:8081/Heidigi/editAddress',formData);
  }
  downloadImage(formData:FormData) {
    return this.http.post('http://localhost:8081/Heidigi/downloadImage',formData);
  }

  constructor(private http: HttpClient) { }
  getImages()
  {
    return this.http.get('http://localhost:8081/Heidigi/getImages');
  }

  getProfile()
  {
    return this.http.get('http://localhost:8081/Heidigi/getProfile');
  }
}
