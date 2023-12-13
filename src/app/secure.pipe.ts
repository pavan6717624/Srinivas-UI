import { Pipe, PipeTransform } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Pipe({
    name: 'secure'
})
export class SecurePipe implements PipeTransform {

  constructor(
    private http: HttpClient,
   ) {}

  async transform(src: string): Promise<any> {
    const token = localStorage.getItem("token");
    const headers = new HttpHeaders({'Authorization': `Bearer ${token}`});
     const imageBlob = await this.http.get(src, {headers, responseType: 'blob'}).toPromise();
    return imageBlob;
  }

}