import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { AccountService, Configuration, RegisterAccount, TsService } from '../tsplanApi';
import accountData from '../../Account.json';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  public parentData: string;
  public childData: string;


  public httpInstance: HttpClient;

  constructor(private http: HttpClient) {
    this.httpInstance = http;
  }

  ngOnInit(): void {
  }

  async onReceiveEventFromChild(eventData: string) {
    this.childData = eventData;

    var spiceNetList
      = eventData;
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
  }
}

