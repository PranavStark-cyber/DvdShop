import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CloudinaryServiceService {

  private cloudinaryUrl = 'https://api.cloudinary.com/v1_1/dstkepd5y/upload';
  private uploadPreset = 'Dvdstore'; 

  constructor(private http: HttpClient) {}

  uploadImage(image: File) {
    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', this.uploadPreset);
    return this.http.post(this.cloudinaryUrl, formData);
  }
}
