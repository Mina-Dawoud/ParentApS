import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/user',
    pathMatch: 'full'
  },
  {
    path: 'user',
    loadChildren: '../app/user/user.module#UserModule'
  },
  {
    path: 'login',
    loadChildren: '../app/login/login.module#LoginModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
