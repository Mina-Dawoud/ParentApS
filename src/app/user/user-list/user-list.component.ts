import { UserService } from './../user.service';
import { User } from './../user.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {
  users: User[];
  subscription: Subscription;

  constructor(private userService: UserService) { }
  
  ngOnInit() {
    this.users = this.userService.getUsers();
    this.subscription = this.userService.userChanged
      .subscribe(
        (users: User[]) => {
          this.users = users;
        }
      );
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
