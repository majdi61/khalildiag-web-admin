import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ModelesService {

    constructor(private http: HttpClient) { }
    getModelsList(queryParams: any): Promise<any> {
        return this.http.get<any>('https://khalildiag-9a2a3d9398e5.herokuapp.com/api/models', {params: queryParams}).toPromise();
    }
    deleteModelById(id: string): Promise<void> {
        return this.http.delete<void>(`https://khalildiag-9a2a3d9398e5.herokuapp.com/api/models/${id}`).toPromise();
    }
    getModelById(id: string): Promise<any> {
        return this.http.get<any>('https://khalildiag-9a2a3d9398e5.herokuapp.com/api/models/'+id).toPromise();
    }

    postModel(obj: any): Promise<any> {
        return this.http.post<any>('https://khalildiag-9a2a3d9398e5.herokuapp.com/api/models', obj).toPromise();
    }
}
