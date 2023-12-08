import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  editContent(formData: FormData) {
    return this.http.post('https://heidigi-app-38b2318c83b0.herokuapp.com/Heidigi/editContent',formData);
  }

  changeTemplate(formData: FormData) {
    return this.http.post('https://heidigi-app-38b2318c83b0.herokuapp.com/Heidigi/changeTemplate',formData);
  }

  downloadImage(formData:FormData) {
    return this.http.post('https://heidigi-app-38b2318c83b0.herokuapp.com/Heidigi/downloadImage',formData);
  }

  postToFacebookImage(formData:FormData) {
    return this.http.post('https://heidigi-app-38b2318c83b0.herokuapp.com/Heidigi/postToFacebookImage',formData);
  }

  postToFacebookVideo(formData:FormData) {
    return this.http.post('https://heidigi-app-38b2318c83b0.herokuapp.com/Heidigi/postToFacebookVideo',formData);
  }

  
  getTemplate(formData:FormData) {
    return this.http.post('https://heidigi-app-38b2318c83b0.herokuapp.com/Heidigi/getTemplate',formData);
  }

  constructor(private http: HttpClient) { }
  getImages()
  {
    return this.http.get('https://heidigi-app-38b2318c83b0.herokuapp.com/Heidigi/getImages');
  }

  getVideos()
  {
    return this.http.get('https://heidigi-app-38b2318c83b0.herokuapp.com/Heidigi/getVideos');
  }

  getProfile()
  {
    return this.http.get('https://heidigi-app-38b2318c83b0.herokuapp.com/Heidigi/getProfile');
  }
}
