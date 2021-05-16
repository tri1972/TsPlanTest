import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent  {
  message: string;
  constructor() 
  { 
    this.message = 'This is a sample of Angular application.';
  }
  // 変数resultを初期化
  result = '現在時刻は不明です。';

  // ボタンクリック時に現在時刻を表示
  onclick() {
    this.result = `現在時刻は、${new Date().toLocaleTimeString()}です。`;
  }
}
