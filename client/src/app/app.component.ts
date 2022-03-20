import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { theUser } from './_models/theUser';
import { AccountService } from './_services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'The Dating App';
  users: any;

  constructor( private accountService: AccountService) {}

  ngOnInit() {
    this.setTheCurrentUser();
  }

  setTheCurrentUser() {
    const user: theUser = JSON.parse(localStorage.getItem('theUser'));
    this.accountService.setTheCurrentUser(user)
  }


}
