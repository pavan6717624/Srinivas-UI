import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SendToFacebook } from './content/content.component';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  showTemplate(formData: FormData) {
    return this.http.post('https://heidigi-app-38b2318c83b0.herokuapp.comshowTemplate',formData);
  }

  showTemplateVideo(formData: FormData) {
    return this.http.post('https://heidigi-app-38b2318c83b0.herokuapp.comshowTemplateVideo',formData);
  }
  editContent(formData: FormData) {
    return this.http.post('https://heidigi-app-38b2318c83b0.herokuapp.comeditContent',formData);
  }

  changeTemplate(formData: FormData) {
    return this.http.post('https://heidigi-app-38b2318c83b0.herokuapp.comchangeTemplate',formData);
  }


  downloadImage(formData:FormData) {
    return this.http.post('https://heidigi-app-38b2318c83b0.herokuapp.comdownloadImage',formData);
  }

  postToFacebookImage(send:SendToFacebook) {
    return this.http.post('https://heidigi-app-38b2318c83b0.herokuapp.compostToFacebookImage',send);
  }

  postToFacebookVideo(formData:FormData) {
    return this.http.post('https://heidigi-app-38b2318c83b0.herokuapp.compostToFacebookVideo',formData);
  }

  
  getTemplate(formData:FormData) {
    return this.http.post('https://heidigi-app-38b2318c83b0.herokuapp.comgetTemplate',formData);
  }

  checkProfile() {
    return this.http.get('https://heidigi-app-38b2318c83b0.herokuapp.comcheckProfile');
  }

  checkFacebookToken() {
    return this.http.get('https://heidigi-app-38b2318c83b0.herokuapp.comfacebookToken');
  }

  getFacebookPageNames() {
    return this.http.get('https://heidigi-app-38b2318c83b0.herokuapp.comgetFacebookPageNames');
  }

  saveFacebookToken(formData:FormData) {
    return this.http.post('https://heidigi-app-38b2318c83b0.herokuapp.comsaveFacebookToken',formData);
  }

  constructor(private http: HttpClient) { }
  getImages()
  {
    return this.http.get('https://heidigi-app-38b2318c83b0.herokuapp.comgetImages');
  }

  getVideos()
  {
    return this.http.get('https://heidigi-app-38b2318c83b0.herokuapp.comgetVideos');
  }

  downloadVideo(formData:FormData) {
    return this.http.post('https://heidigi-app-38b2318c83b0.herokuapp.comdownloadVideo',formData,{responseType: 'blob'});
  }

  getProfile()
  {
    return this.http.get('https://heidigi-app-38b2318c83b0.herokuapp.comgetProfile');
  }
  
  getSrc(formData: FormData)
  {
    return this.http.post('https://heidigi-app-38b2318c83b0.herokuapp.comgetSrc',formData);
  }

  sendFile(formData: FormData) {
    // http is HttpClient. You can override it and add required authentication headers, etc.
    return this.http.post('https://heidigi-app-38b2318c83b0.herokuapp.comuploadImage', formData);
}

sendVideo(formData: FormData) {
  // http is HttpClient. You can override it and add required authentication headers, etc.
  return this.http.post('https://heidigi-app-38b2318c83b0.herokuapp.comuploadVideo', formData);
}

}
