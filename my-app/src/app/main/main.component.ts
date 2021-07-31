import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  public parentData: string;
  public childData: string;

  constructor() 
  { 
  }

  ngOnInit(): void {
  }

  onReceiveEventFromChild(eventData: string) {
    this.childData = eventData;
  }
}

