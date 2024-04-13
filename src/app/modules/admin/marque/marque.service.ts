import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class MarqueService {

    constructor(private http: HttpClient) { }
    getMarquesList(queryParams: any): Promise<any> {
        return this.http.get<any>('https://khalildiag-9a2a3d9398e5.herokuapp.com/api/marques', {params: queryParams}).toPromise();
    }
    deleteMarqueById(id: string): Promise<void> {
        return this.http.delete<void>(`https://khalildiag-9a2a3d9398e5.herokuapp.com/api/marques/${id}`).toPromise();
    }
    getMarqueById(id: string): Promise<any> {
        return this.http.get<any>('https://khalildiag-9a2a3d9398e5.herokuapp.com/api/marques/'+id).toPromise();
    }

    postMarque(obj: any): Promise<any> {
        return this.http.post<any>('https://khalildiag-9a2a3d9398e5.herokuapp.com/api/marque', obj).toPromise();
    }
}
