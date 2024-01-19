import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  showTemplate(formData: FormData) {
    return this.http.post('https://heidigi-app-38b2318c83b0.herokuapp.com/showTemplate',formData);
  }

  showTemplateVideo(formData: FormData) {
    return this.http.post('https://heidigi-app-38b2318c83b0.herokuapp.com/showTemplateVideo',formData);
  }
  editContent(formData: FormData) {
    return this.http.post('https://heidigi-app-38b2318c83b0.herokuapp.com/editContent',formData);
  }

  changeTemplate(formData: FormData) {
    return this.http.post('https://heidigi-app-38b2318c83b0.herokuapp.com/changeTemplate',formData);
  }

  downloadImage(formData:FormData) {
    return this.http.post('https://heidigi-app-38b2318c83b0.herokuapp.com/downloadImage',formData);
  }

  postToFacebookImage(formData:FormData) {
    return this.http.post('https://heidigi-app-38b2318c83b0.herokuapp.com/postToFacebookImage',formData);
  }

  postToFacebookVideo(formData:FormData) {
    return this.http.post('https://heidigi-app-38b2318c83b0.herokuapp.com/postToFacebookVideo',formData);
  }

  
  getTemplate(formData:FormData) {
    return this.http.post('https://heidigi-app-38b2318c83b0.herokuapp.com/getTemplate',formData);
  }

  checkProfile() {
    return this.http.get('https://heidigi-app-38b2318c83b0.herokuapp.com/checkProfile');
  }

  checkFacebookToken() {
    return this.http.get('https://heidigi-app-38b2318c83b0.herokuapp.com/facebookToken');
  }

  saveFacebookToken(formData:FormData) {
    return this.http.post('https://heidigi-app-38b2318c83b0.herokuapp.com/saveFacebookToken',formData);
  }

  constructor(private http: HttpClient) { }
  getImages()
  {
    return this.http.get('https://heidigi-app-38b2318c83b0.herokuapp.com/getImages');
  }

  getVideos()
  {
    return this.http.get('https://heidigi-app-38b2318c83b0.herokuapp.com/getVideos');
  }

  downloadVideo(formData:FormData) {
    return this.http.post('https://heidigi-app-38b2318c83b0.herokuapp.com/downloadVideo',formData,{responseType: 'blob'});
  }

  getProfile()
  {
    return this.http.get('https://heidigi-app-38b2318c83b0.herokuapp.com/getProfile');
  }
  
  getSrc(formData: FormData)
  {
    return this.http.post('https://heidigi-app-38b2318c83b0.herokuapp.com/getSrc',formData);
  }

  sendFile(formData: FormData) {
    // http is HttpClient. You can override it and add required authentication headers, etc.
    return this.http.post('https://heidigi-app-38b2318c83b0.herokuapp.com/uploadImage', formData);
}

sendVideo(formData: FormData) {
  // http is HttpClient. You can override it and add required authentication headers, etc.
  return this.http.post('https://heidigi-app-38b2318c83b0.herokuapp.com/uploadVideo', formData);
}

}
