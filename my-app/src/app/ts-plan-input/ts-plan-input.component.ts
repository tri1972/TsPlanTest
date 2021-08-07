//html内部のtextbox入力部品のComponent
/**
 * textboxの双方向データバインディング
 * 参考Url
 * https://qiita.com/kuniatsu/items/fd79e1e55e6b2533af5e
 * 
 * Angularで「フォーム」への入力値をイベントハンドラーで受け取るには？
 * https://www.atmarkit.co.jp/ait/articles/1708/16/news107.html
 */
import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'TsPlanInput',
  templateUrl: './ts-plan-input.component.html',
  styleUrls: ['./ts-plan-input.component.css']
})
export class TsPlanInputComponent implements OnInit {
  
  @Input()　dataFromParent: string;
  @Output() event = new EventEmitter<string>();
  
  constructor() {
  }

  async onclick(value: string) {
    this.event.emit(
      value
    );
  }

  ngOnInit(): void {
  }

}
