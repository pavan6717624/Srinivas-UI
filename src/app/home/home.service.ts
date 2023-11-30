import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  editContent(formData: FormData) {
    return this.http.post('https://takeoff-pavan.herokuapp.com/Heidigi/editContent',formData);
  }

  changeTemplate(formData: FormData) {
    return this.http.post('https://takeoff-pavan.herokuapp.com/Heidigi/changeTemplate',formData);
  }

  downloadImage(formData:FormData) {
    return this.http.post('https://takeoff-pavan.herokuapp.com/Heidigi/downloadImage',formData);
  }

  postToFacebook(formData:FormData) {
    return this.http.post('https://takeoff-pavan.herokuapp.com/Heidigi/postToFacebook',formData);
  }

  getTemplate(formData:FormData) {
    return this.http.post('https://takeoff-pavan.herokuapp.com/Heidigi/getTemplate',formData);
  }

  constructor(private http: HttpClient) { }
  getImages()
  {
    return this.http.get('https://takeoff-pavan.herokuapp.com/Heidigi/getImages');
  }

  getVideos()
  {
    return this.http.get('https://takeoff-pavan.herokuapp.com/Heidigi/getVideos');
  }

  getProfile()
  {
    return this.http.get('https://takeoff-pavan.herokuapp.com/Heidigi/getProfile');
  }
}
