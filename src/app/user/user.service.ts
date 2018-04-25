import { Observable } from 'rxjs/Observable';
import { JSON_PATH } from './../shared/constant/defines';
import { User } from './user.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import * as JsonQuery from 'jsonpath';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_URLs } from '../shared/constant/routes-config';
import 'rxjs/Rx';

@Injectable()
export class UserService {
  loadedUserData: { page_number: number, userData: User[] }[] = [];
  userChanged = new Subject<User[]>();
  totalPages: number;
  private pageNumber: number;
  private numberOfUsersInPage = 3;
  private users: User[];

  constructor(private http: HttpClient) { }

  getUsers(page_number: number) {
    if (!this.totalPages || (this.totalPages && page_number <= this.totalPages)) {
      this.pageNumber = page_number;
      if (this.checkIsUserDataLoaded(page_number)) {
        this.users = this.getLoadedDataByPageNumber(page_number);
        return Observable.of(this.users.slice());
      } else {
        /** load user data */
        const url = API_URLs.User.getAllUsers
          .replace('{page_number}', page_number.toString());

        let headers = new HttpHeaders();
        headers = headers.append('Content-Type', 'application/json');
        const options = {
          headers: headers
        };

        return this.http.get(url, options).map((res) => {
          this.users = [];
          if (!this.totalPages) {
            this.totalPages = res['total_pages'] || 1;
          }
          if (res['data']) {
            if (res['data'].length) {
              res['data'].forEach(user => this.users.push(this.mapUserData(user)));
              /** add new page user data to loadedUserData array with its page number */
              this.loadedUserData.push({ page_number: page_number, userData: this.users });
            } else {
              return this.getLastPageUserData();
            }
          }

          return this.users.slice();
        }
        );
      }
    } else {
      return Observable.of(this.users.slice());
    }
  }
  getUser(id: number) {
    return this.users.find(user => user.id === id);
  }
  addUser(user: User) {
    const url = API_URLs.User.addUser;

    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');

    /** I can't find same data which exists in the get API in the post API
     * so I will send the lsat name as a job
     */
    const body = {
      "name": user.firstName,
      "job": user.lastName
    }

    const options = {
      headers: headers
    };

    return this.http.post(url, body, options).map((res) => {
      user.id = +res['id'];
      /** If the page number is the last page in loadedUserData array
       * and the number of users inside it is less than 3
       * then I will push the added user to the current users array that applied on the screen
       */
      const lastPageNumber = this.getLastPageNumber();
      if (this.users.length < this.numberOfUsersInPage) {
        this.users.push(user);
        /** I am sure that this page number is exist inside the loadedUserData array */
        this.checkIsUserDataLoaded(lastPageNumber).userData = this.users;
        this.userChanged.next(this.users.slice());
      } else {
        const lastLoadedUserData = this.checkIsUserDataLoaded(this.totalPages);
        if (lastLoadedUserData && lastLoadedUserData.userData.length < this.numberOfUsersInPage) {
          lastLoadedUserData.userData.push(user);
        } else {
          this.loadedUserData.push({
            page_number: ++this.totalPages,
            userData: [user]
          });
        }
      }
    }
    );

  }
  updateUser(id: number, newUser: User) {
    const url = API_URLs.User.updateUser
      .replace('{user_id}', id.toString());

    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');

    /** I can't find same data which exists in the get API in the post API
     * so I will send the lsat name as a job
     */
    const body = {
      "name": newUser.firstName,
      "job": newUser.lastName
    }

    const options = {
      headers: headers
    };

    return this.http.patch(url, body, options).map(() => {
      const userIndex = this.getUserIndexById(id);
      if (userIndex !== -1) {
        newUser.id = id;
        this.users[userIndex] = newUser;
        this.userChanged.next(this.users.slice());
      }
    }
    );
  }
  deleteUser(id: number) {
    const url = API_URLs.User.deleteUser
      .replace('{user_id}', id.toString());

    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');

    const options = {
      headers: headers
    };

    return this.http.delete(url, options).map(() => {
      const userIndex = this.getUserIndexById(id);
      if (userIndex !== -1) {
        this.users.splice(userIndex, 1);
        this.userChanged.next(this.users.slice());
      }
    }
    );
  }

  private getUserIndexById(id: number) {
    return this.users.indexOf(this.getUser(id));
  }
  private mapUserData(user: any) {
    const userData = new User();
    userData.id = JsonQuery.value(user, JSON_PATH.USER.id) || null;
    userData.firstName = JsonQuery.value(user, JSON_PATH.USER.firstName) || null;
    userData.lastName = JsonQuery.value(user, JSON_PATH.USER.lastName) || null;
    userData.imagePath = JsonQuery.value(user, JSON_PATH.USER.imagePath) || null;
    return userData;
  }
  private checkIsUserDataLoaded(page_number: number) {
    return this.loadedUserData.find(loadedData => loadedData.page_number === page_number);
  }
  private getLoadedDataByPageNumber(page_number: number) {
    const loadedData = this.loadedUserData.find(loadedData => loadedData.page_number === page_number);
    if (loadedData) {
      return loadedData.userData.slice();
    }
    return [];
  }
  private getLastPageUserData() {
    const lastPageNumber = this.getLastPageNumber();
    if (lastPageNumber !== -1) {
      return this.getLoadedDataByPageNumber(lastPageNumber);
    }
    return [];
  }
  private getLastPageNumber() {
    if (this.loadedUserData.length) {
      return this.loadedUserData[this.loadedUserData.length - 1].page_number;
    }
    return -1;
  }
}
