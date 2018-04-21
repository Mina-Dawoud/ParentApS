import { UserDetailsComponent } from './user-details/user-details.component';
import { UserComponent } from './user.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { UserStartComponent } from './user-start/user-start.component';
import { UserEditComponent } from './user-edit/user-edit.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      { path: '', component: UserStartComponent },
      { path: 'new', component: UserEditComponent },
      { path: ':id', component: UserDetailsComponent },
      { path: ':id/edit', component: UserEditComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
