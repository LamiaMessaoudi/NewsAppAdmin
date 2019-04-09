import { Injectable } from '@angular/core';
import {BehaviorSubject, config, Observable} from 'rxjs';
import {Admin} from '../Models/Admin';
import {HttpClient, HttpParams} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

 private currentAdminSubject: BehaviorSubject<Admin>;
    public currentAdmin: Observable<Admin>;

    constructor(private http: HttpClient) {
        this.currentAdminSubject = new BehaviorSubject<Admin>(JSON.parse(localStorage.getItem('currentAdmin')));
        this.currentAdmin = this.currentAdminSubject.asObservable();
    }

    public get currentAdminValue(): Admin {
        return this.currentAdminSubject.value;
    }
    register(donn:FormData)
    {
        return this.http.post(`http://localhost:9999/registerAdmin`, donn)
        .pipe(map(admin => {
            // register successful if there's a jwt token in the response
         
    
                localStorage.setItem('currentAdmin', JSON.stringify(admin));
                
           
        }));
    }

    login(username: string, password: string) {
      const params = new HttpParams().set('email', username).set('password', password);
      return this.http.post<any>(`http://localhost:9999/loginAdmin`, params)
            .pipe(map(admin => {
                // login successful if there's a jwt token in the response
                if (admin ) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentAdmin', JSON.stringify(admin));
                    this.currentAdminSubject.next(admin);
                }
                return admin;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentAdmin');
        this.currentAdminSubject.next(null);
    }

}
