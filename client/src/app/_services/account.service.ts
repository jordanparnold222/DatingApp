import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import { theUser } from '../_models/theUser';
import { ReplaySubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = 'https://localhost:5001/api/';
  private theCurrentUserSource = new ReplaySubject<theUser>(1);
  theCurrentUser$ = this.theCurrentUserSource.asObservable();

  constructor(private http: HttpClient) { }

  login(model: any)  {
    return this.http.post(this.baseUrl + 'account/login', model).pipe(
      map((response: theUser) => {
        const theUser = response;
        if (theUser) {
          localStorage.setItem('theUser',JSON.stringify(theUser));
          this.theCurrentUserSource.next(theUser);
        }
      })
    )
  }

  register(model: any)  {
    return this.http.post(this.baseUrl + 'account/register', model).pipe(
      map((user: theUser) => {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.theCurrentUserSource.next(user)
        }
        return user;
      })
    )
  }

  setTheCurrentUser(user: theUser)  {
    this.theCurrentUserSource.next(user)
  }


  logout()  {
    localStorage.removeItem('theUser');
    this.theCurrentUserSource.next(null);
  }
}
              