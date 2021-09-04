import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { MainComponent } from './main/main.component';//ここにコンポネントをインポートする
import { ExampleComponent } from './example/example.component';

const routes: Routes = 
[
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'users', component: UserListComponent },
  { path: 'users/:id/edit', component: UserEditComponent },
  { path: 'main', component: MainComponent },//ここにコンポネントへのパス(http://localhost:4200/main）を追加する
  { path: 'example', component:ExampleComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
