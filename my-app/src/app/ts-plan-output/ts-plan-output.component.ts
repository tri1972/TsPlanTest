import { Component, OnInit } from '@angular/core';
import { outputContainer } from './outputContainer';
import { Input } from '@angular/core';
import { SimpleChanges } from '@angular/core';
import {OnChanges} from '@angular/core';

@Component({
  selector: 'TsPlanOutput',
  templateUrl: './ts-plan-output.component.html',
  styleUrls: ['./ts-plan-output.component.css']
})
export class TsPlanOutputComponent implements OnInit, OnChanges{

  @Input()　dataFromParent: string;
  @Input()　dataFromParentContainer: outputContainer;

  public container:outputContainer;
  constructor() { }

  ngOnInit(): void {
  }
  
  ngOnChanges(changes: SimpleChanges) {
    console.log(changes.dataFromParent);
  }

}
