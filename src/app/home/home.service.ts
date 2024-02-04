import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SendToFacebook } from './content/content.component';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  showTemplate(formData: FormData) {
    return this.http.post('http://localhost:8081/showTemplate',formData);
  }

  showTemplateVideo(formData: FormData) {
    return this.http.post('http://localhost:8081/showTemplateVideo',formData);
  }
  editContent(formData: FormData) {
    return this.http.post('http://localhost:8081/editContent',formData);
  }

  changeTemplate(formData: FormData) {
    return this.http.post('http://localhost:8081/changeTemplate',formData);
  }


  downloadImage(formData:FormData) {
    return this.http.post('http://localhost:8081/downloadImage',formData);
  }

  postToFacebookImage(send:SendToFacebook) {
    return this.http.post('http://localhost:8081/postToFacebookImage',send);
  }

  postToFacebookVideo(formData:FormData) {
    return this.http.post('http://localhost:8081/postToFacebookVideo',formData);
  }

  
  getTemplate(formData:FormData) {
    return this.http.post('http://localhost:8081/getTemplate',formData);
  }

  checkProfile() {
    return this.http.get('http://localhost:8081/checkProfile');
  }

  checkFacebookToken() {
    return this.http.get('http://localhost:8081/facebookToken');
  }

  getFacebookPageNames() {
    return this.http.get('http://localhost:8081/getFacebookPageNames');
  }

  saveFacebookToken(formData:FormData) {
    return this.http.post('http://localhost:8081/saveFacebookToken',formData);
  }

  constructor(private http: HttpClient) { }
  getImages()
  {
    return this.http.get('http://localhost:8081/getImages');
  }

  getVideos()
  {
    return this.http.get('http://localhost:8081/getVideos');
  }

  downloadVideo(formData:FormData) {
    return this.http.post('http://localhost:8081/downloadVideo',formData,{responseType: 'blob'});
  }

  getProfile()
  {
    return this.http.get('http://localhost:8081/getProfile');
  }
  
  getSrc(formData: FormData)
  {
    return this.http.post('http://localhost:8081/getSrc',formData);
  }

  sendFile(formData: FormData) {
    // http is HttpClient. You can override it and add required authentication headers, etc.
    return this.http.post('http://localhost:8081/uploadImage', formData);
}

sendVideo(formData: FormData) {
  // http is HttpClient. You can override it and add required authentication headers, etc.
  return this.http.post('http://localhost:8081/uploadVideo', formData);
}

}
