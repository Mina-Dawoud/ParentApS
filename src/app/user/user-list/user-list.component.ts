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
  userSubscription: Subscription;
  pageNumber: number = 1;
  showSpinner: boolean;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getUsersList();
    this.userSubscription = this.userService.userChanged
      .subscribe(
        (users: User[]) => {
          this.users = users;
        }
      );
  }
  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
  private getUsersList() {
    this.showSpinner = true;
    this.userService.getUsers(this.pageNumber).subscribe((users: User[]) => {
      this.users = users;
      this.showSpinner = false;
    });
  }
  increasePageNumber() {
    if (this.pageNumber < this.userService.totalPages) {
      this.pageNumber++;
      this.getUsersList();
    }
  }
  decreasePageNumber() {
    if (this.pageNumber > 1) {
      this.pageNumber--;
      this.getUsersList();
    }
  }
}
