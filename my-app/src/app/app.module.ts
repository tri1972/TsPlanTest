import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { UserService } from './user/user.service';
import { FormsModule } from '@angular/forms';
import { ConfirmDialogComponent } from './tools/confirm-dialog/confirm-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import { MainComponent } from './main/main.component';
import { TsPlanInputComponent } from './ts-plan-input/ts-plan-input.component';
import { TsPlanOutputComponent } from './ts-plan-output/ts-plan-output.component';
import { ExampleComponent } from './example/example.component';
import { NgxPageScrollCoreModule } from 'ngx-page-scroll-core';
import { NgxPageScrollModule } from 'ngx-page-scroll';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuComponent,
    DashboardComponent,
    UserListComponent,
    UserEditComponent,
    ConfirmDialogComponent,
    MainComponent,
    TsPlanInputComponent,
    TsPlanOutputComponent,
    ExampleComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatDialogModule,
    BrowserAnimationsModule,
    // Include it under 'imports' in your application module
    // after BrowserModule.
    HttpClientModule,
    //ページ内アンカータグへのリンク実行のためのモジュール追加
    //<参考>https://qiita.com/atomyah/items/2219bf9e245261a26287
    NgxPageScrollCoreModule,
    NgxPageScrollModule,
    MatSliderModule,
    MatButtonModule
  ],
  providers: [
    UserService
  ],
  entryComponents: [
    ConfirmDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
