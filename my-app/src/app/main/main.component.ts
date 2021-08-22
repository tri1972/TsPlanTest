import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { AccountService, Configuration, RegisterAccount, TsService } from '../tsplanApi';
//import accountData from '../../Account.json';
import { outputContainer } from '../ts-plan-output/outputContainer';
import { observable } from 'rxjs';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { exit } from 'process';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  /**
   * コンポーネント間のデータ受け渡しについて
   * 参考url：https://dev.classmethod.jp/articles/angular-input-output/
   */
  public parentData: boolean;
  public containerParent:Array<outputContainer>
  public childData: string;

  public httpInstance: HttpClient;

  constructor(private http: HttpClient) {
    this.httpInstance = http;
  }

  ngOnInit(): void {
    this.parentData=false;
  }


  public async callTsPost(httpService: HttpClient, token: string, spiceNetList: string):Promise< outputContainer> {
    var outputData=new outputContainer();
    var configTsPost = new Configuration();
    configTsPost.username = "test@gmail.com";
    configTsPost.password = "grteio234897uhypqa";
    configTsPost.basePath = 'https://tsplanning.azurewebsites.net';
    //configTsPost.basePath='http://localhost:54248';
    configTsPost.accessToken = 'Bearer ' + token;
    configTsPost.apiKeys = { "Authorization": 'Bearer ' + token }
    var bodyTsSpiceNetListPost
      = {
      spiceNetList: spiceNetList,
      temperature: [40]
    };
    var instance
      = await new TsService(httpService, null, configTsPost);

    await instance.apiTsSpiceNetListPost(bodyTsSpiceNetListPost, 'body', true)
      .subscribe(
        (x)=>{
          console.log('Current Position: ', x);
          this.containerParent=new Array<outputContainer>();
          for(var i=0;i<x.temperature.length;i++){
            var tmpData=new outputContainer();
            tmpData.Temperature=x.temperature[i].toString();
            tmpData.nodeNumber=i;
            this.containerParent.push(tmpData);
          }
          //this.parentData=true;
        }
      );
    return await new Promise((resolve)=>{
      resolve(outputData)
    })
  }

  async onReceiveEventFromChild(eventData: string) {
    this.childData = eventData;
    var data=this.parentData;

    var spiceNetList
      = eventData;
    //swaggerApi使用
    var config = new Configuration();
    config.username = "test@gmail.com";
    config.password = "grteio234897uhypqa";
    config.basePath = 'https://tsplanning.azurewebsites.net';
    //config.basePath='http://localhost:54248';
    try {
      var bodyAccountPost = { password: "grteio234897uhypqa", userName: "test@gmail.com"  };
      var instanceAccountService = new AccountService(this.http, null, config);
      var localHttpInstance: HttpClient = this.httpInstance;
      await instanceAccountService.apiAccountPost(bodyAccountPost, 'body', true).subscribe(
        (x)=>{
          this.callTsPost(localHttpInstance, x.token, eventData)
        }
        /*
        {
        next(position) {
          localHttpInstance
          this.token = position.token;
          this.expiresIn = position.expiresIn;
          this.userName = position.userName;
          console.log("test")
          MainComponent.callTsPost(localHttpInstance, position.token, eventData)
          .then
          (
            ()=>{ 
              return this.token
            });
        },
        error(msg) {
          console.log('Error Getting Location: ', msg);
        }
      }*/
      );
    }
    catch (err) {
      console.log(err);
    }
  }
}

