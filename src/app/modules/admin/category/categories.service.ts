import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) { }
    getCategoriesList(queryParams: any): Promise<any> {
        return this.http.get<any>('https://khalildiag-9a2a3d9398e5.herokuapp.com/api/category', {params: queryParams}).toPromise();
    }
    deleteCategoryById(id: string): Promise<void> {
        return this.http.delete<void>(`https://khalildiag-9a2a3d9398e5.herokuapp.com/api/category/${id}`).toPromise();
    }
    getCategoryById(id: string): Promise<any> {
        return this.http.get<any>('https://khalildiag-9a2a3d9398e5.herokuapp.com/api/category/'+id).toPromise();
    }

    postCategory(obj: any): Promise<any> {
        return this.http.post<any>('https://khalildiag-9a2a3d9398e5.herokuapp.com/api/category', obj).toPromise();
    }
}
