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

  @Input()　dataFromParent: boolean;
  @Input()　dataFromParentContainer: outputContainer;

  containers:outputContainer[];
  
  constructor() { }

  ngOnInit(): void {
  }
  
  ngOnChanges(changes: SimpleChanges) {
    try {
      //if(changes.dataFromParent!=null && changes.dataFromParent.currentValue==true){
      if (changes.dataFromParentContainer.currentValue != null) {
        console.log(changes.dataFromParentContainer);
        
        if(this.containers==null){
          this.containers=new Array();
        }
        for (var tmpData = 0; tmpData < changes.dataFromParentContainer.currentValue.length; tmpData++) {
          this.containers[tmpData]=new outputContainer();
          this.containers[tmpData].nodeNumber=changes.dataFromParentContainer.currentValue[tmpData].nodeNumber;
          this.containers[tmpData].Temperature=changes.dataFromParentContainer.currentValue[tmpData].Temperature;
        }
        /*
        changes.dataFromParentContainer.currentValue
        .filter((data)=>{
          if(this.container==null){
            this.container[data.nodeNumber]=new outputContainer();
          }
          this.container.push(data);
        })
        */
      }
      //}
    } catch (err) {
      console.log(err);
    }
  }
}
