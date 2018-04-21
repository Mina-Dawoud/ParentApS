import { User } from './user.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class UserService {
  userChanged = new Subject<User[]>();
  private users: User[] = [
    new User('first name 1', 'last name 1', 'https://s3.amazonaws.com/uifaces/faces/twitter/stephenmoon/128.jpg', 1),
    new User('first name 2', 'last name 2', 'https://s3.amazonaws.com/uifaces/faces/twitter/stephenmoon/128.jpg', 2),
    new User('first name 3', 'last name 3', 'https://s3.amazonaws.com/uifaces/faces/twitter/stephenmoon/128.jpg', 3),
    new User('first name 4', 'last name 4', 'https://s3.amazonaws.com/uifaces/faces/twitter/stephenmoon/128.jpg', 4),
    new User('first name 5', 'last name 5', 'https://s3.amazonaws.com/uifaces/faces/twitter/stephenmoon/128.jpg', 5),
    new User('first name 6', 'last name 6', 'https://s3.amazonaws.com/uifaces/faces/twitter/stephenmoon/128.jpg', 6),
    new User('first name 7', 'last name 7', 'https://s3.amazonaws.com/uifaces/faces/twitter/stephenmoon/128.jpg', 7),
    new User('first name 8', 'last name 8', 'https://s3.amazonaws.com/uifaces/faces/twitter/stephenmoon/128.jpg', 8),
    new User('first name 9', 'last name 9', 'https://s3.amazonaws.com/uifaces/faces/twitter/stephenmoon/128.jpg', 9)
  ]
  constructor() { }
  getUsers() {
    return this.users.slice();
  }
  getUser(id: number) {
    return this.users.find(user => user.id === id);
  }
  addUser(user: User) {
    this.users.push(user);
    this.userChanged.next(this.users.slice());
  }
  updateUser(id: number, newUser: User) {
    const userIndex = this.getUserIndex(id);
    if (userIndex !== -1) {
      newUser.id = id;
      this.users[userIndex] = newUser;
      this.userChanged.next(this.users.slice());
    }
  }
  deleteUser(id: number) {
    const userIndex = this.getUserIndex(id);
    if (userIndex !== -1) {
      this.users.splice(userIndex, 1)
      this.userChanged.next(this.users.slice());
    }
  }
  private getUserIndex(id: number) {
    return this.users.indexOf(this.getUser(id));
  }
}
