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
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { AccountService, Configuration, RegisterAccount, TsService } from '../tsplanApi';
import accountData from '../../Account.json';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'TsPlanInput',
  templateUrl: './ts-plan-input.component.html',
  styleUrls: ['./ts-plan-input.component.css']
})
export class TsPlanInputComponent implements OnInit {
  @Output() event = new EventEmitter<string>();
  name = 'Tom';
  msg = '';
  public httpInstance: HttpClient;
  constructor(private http: HttpClient) {
    this.httpInstance = http;
  }

  async onclick(value: string) {

    var spiceNetList
      = value;
    //swaggerApi使用
    var config = new Configuration();
    config.username = "sakaitri@gmail.com";
    config.password = "pxi13351";
    config.basePath = 'https://tsplanning.azurewebsites.net';
    //config.basePath='http://localhost:54248';

    async function callTsPost(httpService: HttpClient, token: string) {
      var configTsPost = new Configuration();
      configTsPost.username = "sakaitri@gmail.com";
      configTsPost.password = "pxi13351";
      configTsPost.basePath = 'https://tsplanning.azurewebsites.net';
      //configTsPost.basePath='http://localhost:54248';
      configTsPost.accessToken = 'Bearer ' + token;
      configTsPost.apiKeys = { "Authorization": 'Bearer ' + token }
      var bodyTsSpiceNetListPost
        = {
        spiceNetList: spiceNetList,
        temperature: [40]
      };
      var instance = await new TsService(httpService, null, configTsPost);
      await instance.apiTsSpiceNetListPost(bodyTsSpiceNetListPost, 'body', true).subscribe({
        next(position) {
          console.log('Current Position: ', position);
        },
        error(msg) {
          console.log('Error Getting Location: ', msg);
        }
      });
    }

    try {
      var bodyAccountPost = { password: accountData.password, userName: accountData.username };
      var instanceAccountService = new AccountService(this.http, null, config);
      var localHttpInstance: HttpClient = this.httpInstance;
      await instanceAccountService.apiAccountPost(bodyAccountPost, 'body', true).subscribe({
        next(position) {
          localHttpInstance
          this.token = position.token;
          this.expiresIn = position.expiresIn;
          this.userName = position.userName;
          callTsPost(localHttpInstance, position.token);
        },
        error(msg) {
          console.log('Error Getting Location: ', msg);
        }
      });
    }
    catch (err) {
      console.log(err);
    }

    this.event.emit(
      '子コンポーネントから親コンポーネントへデータを渡す際はイベントを経由します。'
    );
  }

  ngOnInit(): void {
  }

}
