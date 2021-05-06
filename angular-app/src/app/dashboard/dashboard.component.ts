import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  message: string;
  constructor() 
  { 
    this.message='日本語OK？'
  }

  ngOnInit(): void {
  }

}
