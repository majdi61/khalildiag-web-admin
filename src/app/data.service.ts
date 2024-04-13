import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class DataService {
    constructor(private http: HttpClient) {}

    getUsers() {
        return this.http.get('http://192.168.100.61:1001/api/link/');
    }
}
