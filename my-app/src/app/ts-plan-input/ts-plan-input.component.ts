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

@Component({
  selector: 'TsPlanInput',
  template: `
    <div>
      <p>
        <label for="spiceNetList">spiceNetListの入力：</label>
      </p>
      <p>
        <textarea id="t_message" name="message" placeholder="こちらにお問い合わせ内容を入力してください。" rows="4" cols="40" #data>
        </textarea>
        <input type="button" value="送信" (click)="onclick(data.value)" />
      </p>
      <div>{{msg}}</div>
    </div>
  `,
  styles: [`
    .a {
      background-color: #aaa;
      text-align:center;
      padding: 1em;
    }`]
})
export class TsPlanInputComponent implements OnInit {
  name = 'Tom';
  msg= '';
  constructor() { }
  
  onclick(value: string) {
    this.msg = `Hello, ${value}!!`;
  } 

  ngOnInit(): void {
  }

}
