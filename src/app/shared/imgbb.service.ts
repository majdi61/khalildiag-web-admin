import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ImgbbService {
private readonly apiKey: string = 'c23d2355cb6eb28985bb27b4a8f19751'
  constructor(private  readonly httpClient: HttpClient) { }
    uploadImg(file: File): Observable<string> {
    const formData = new FormData();
    formData.append('image',file);
    return this.httpClient.post('/upload', formData, { params: { key: this.apiKey } }).pipe(map((response) => response['data']['url']));
    }

}
