import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

    constructor(private http: HttpClient) { }
    getProductsList(queryParams: any): Promise<any> {
        return this.http.get<any>('https://khalildiag-9a2a3d9398e5.herokuapp.com/api/produits', {params: queryParams}).toPromise();
    }
    deleteProductById(id: string): Promise<void> {
        return this.http.delete<void>(`https://khalildiag-9a2a3d9398e5.herokuapp.com/api/produits/${id}`).toPromise();
    }
    getProductById(id: string): Promise<any> {
        return this.http.get<any>('https://khalildiag-9a2a3d9398e5.herokuapp.com/api/produits/'+id).toPromise();
    }

    postProduct(obj: any): Promise<any> {
        return this.http.post<any>('https://khalildiag-9a2a3d9398e5.herokuapp.com/api/produits', obj).toPromise();
    }
}
