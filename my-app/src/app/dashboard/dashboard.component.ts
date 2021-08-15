//"use strict";
//import { HttpClient, HttpHandler, HttpHeaders, JsonpClientBackend } from '@angular/common/http';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { ComponentFixtureNoNgZone, waitForAsync } from '@angular/core/testing';
import { rejects } from 'assert';
import { promise } from 'protractor';
//import { gunzip } from 'zlib';
import { AccountService, Configuration, RegisterAccount, TsService } from '../tsplanApi';
//import accountData from '../../Account.json';//アカウント取得用import
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent  {
  

  message: string;
  testdata:string="testtest";
  
  token:string;
  expiresIn:string;
  userName:string;
  public httpInstance:HttpClient;

  constructor(private http:HttpClient) 
  { 
    this.httpInstance=http;
    this.message = 'This is a sample of Angular application.';
  }
  // 変数resultを初期化
  result = '現在時刻は不明です。';
  
  str:string;
  // ボタンクリック時に現在時刻を表示
  async onclick() {
    this.result = `現在時刻は、${new Date().toLocaleTimeString()}です。`;
    //swaggerApi使用
    var config=new Configuration();
    config.username="sakaitri@gmail.com";
    config.password="pxi13351";
    //config.basePath='https://tsplanning.azurewebsites.net';
    config.basePath='http://localhost:54248';

    async function callTsPost(httpService: HttpClient ,token:string){
      var configTsPost=new Configuration();
      configTsPost.username="sakaitri@gmail.com";
      configTsPost.password="pxi13351";
      //configTsPost.basePath='https://tsplanning.azurewebsites.net';
      configTsPost.basePath='http://localhost:54248';
      configTsPost.accessToken='Bearer '+token;
      configTsPost.apiKeys={"Authorization":'Bearer '+token}
      //ここのSpiceNetList文字列には改行コード(\n)を入れてはいけない
      var spiceNetList
      =String.raw`* D:\sakai\OneDrive\ドキュメント\LTspiceXVII\lib\sym\SpecialFunctions\CaseSurface.asc
        XX1 test N001 heatresistancesurfacetooutsideair params: width=0.2 depth=0.3 WindDirection=x PositionSurface=top VelocityWind=0.01 Radiation=0.85 ThermalResistance=0 PositiveNode=test
        XX2 N001 N002 heatresistancesurfacetoinside params: width=0.2 depth=0.3 thick=0.005 thermalConductivity=0.278
        R1 N003 N002 0.1
        R2 N003 N002 0.18
        R3 0 N004 0.1
        B1 test 0 basetemperature=40 PositiveNode=test
        XX3 N003 N004 currentpole params: Value=2.3 PositiveNode=N003
        
        * block symbol definitions
        .subckt heatresistancesurfacetooutsideair INPUT OUTPUT
        R1 N001 INPUT {WindDirection}
        R2 N002 N001 {PositionSurface}
        R3 N003 N002 {Width}
        R4 N004 N003 {Depth}
        R5 N005 N004 {VelocityWind}
        R6 N006 N005 {Radiation}
        R7 N007 N006 {ThermalResistance}
        R8 OUTPUT N007 {PositiveNode}
        .ends heatresistancesurfacetooutsideair
        
        .subckt heatresistancesurfacetoinside VIN VOUT
        R1 N001 VIN {thermalConductivity}
        R2 N001 N002 {width}
        R3 N002 N003 {depth}
        R4 N003 VOUT {thick}
        .param {width}=5 {thermalConductivity}=8 {depth}=9 {thick}=10
        .ends heatresistancesurfacetoinside
        
        .subckt currentpole  
        I1 INPUT N001 {Value}
        R1 N001 OUTPUT {PositiveNode}
        .ends currentpole
        
        .tran 0 1 0.5 0.01
        .physicalTable DEN=0.0278
        .backanno
        .end
        `
      var bodyTsSpiceNetListPost
      ={    
        spiceNetList: spiceNetList,
        temperature:[40]
      };
      var instance=await new TsService(httpService,null,configTsPost);
      await instance.apiTsSpiceNetListPost(bodyTsSpiceNetListPost,'body',true).subscribe({
        next(position) {
          console.log('Current Position: ', position);
        },
        error(msg) {
          console.log('Error Getting Location: ', msg);
        }
      });
    }
    try{
      //以下のコメントアウトを外せば動作できる（ただしAccount.jsonが必要）
      /*
      //var bodyAccountPost={ password:accountData.password,userName:accountData.username};
      var instanceAccountService= new AccountService(this.http,null,config);
      var localHttpInstance:HttpClient=this.httpInstance;
      await instanceAccountService.apiAccountPost(bodyAccountPost,'body',true).subscribe({
        next(position) {
          localHttpInstance
          this.token=position.token;
          this.expiresIn=position.expiresIn;
          this.userName=position.userName;
          callTsPost(localHttpInstance,position.token);
        },
        error(msg) {
          console.log('Error Getting Location: ', msg);
        }
      });
    */

    //http://localhost:54248/api/Values
    //https://tsplanning.azurewebsites.net/api/Values 

    /*
    //作成したget関数
    getData('https://tsplanning.azurewebsites.net/api/Values').then(function(response) {
      //return response;
      return response.json();
    }).then(function(json) {
      // jsonにJSONオブジェクトで結果が渡される
      console.log(json);
    });
    */

   /*
   //作成したpost関数
    await postData('http://localhost:54248/api/Account',{
      "password": accountData.password,
      "userName": accountData.username})
    .then(data=>{
      this.str=data;
      var jsonObj = JSON.parse(data);
      var strToken= jsonObj.token;
      var strUserNam=jsonObj.userName;
    });
    console.log(this.str);
    */
    }
    catch(err){
      console.log(err);
    }
  }
}
// POST メソッドの実装の例
function postData(url = '', data = {
}) 
{
try{
  charsReceived:Number;
  stringData:String;
  // 既定のオプションには * が付いています
  return fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    //credentials: 'same-origin', // include, *same-origin, omit
    headers: 
    {
      'accept':'*/*',
      'Accept-Encoding':'gzip, deflate, br',
      'Accept-Language':'ja,en-US;q=0.7,en;q=0.3',
      'Connection':'keep-alive',
      'Content-Length':'55',
      'Content-Type':'application/json-patch+json',
      'Access-Control-Allow-Origin': 'http://localhost:54248'
      //'Content-Type': 'application/x-www-form-urlencoded',
      //'Content-Type': 'application/json-patch+json',
      //'Content-Type': 'application/json'
    },

    //redirect: 'follow', // manual, *follow, error
    //referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // 本文のデータ型は "Content-Type" ヘッダーと一致する必要があります 
  })
  .then(response => response.body.getReader())
  .then(async (reader)=>{
    /*
    参考url：https://sbfl.net/blog/2018/05/26/javascript-streams-api/
    */
    let veryLongText = ''; // 細切れの値をここに結合していく。
    const decoder = new TextDecoder();// ReadableStream.read()はPromiseを返す。
    const wait = async (ms) => new Promise(resolve => setTimeout(resolve, ms));
    async function readChunk2({done, value}){
      if(done) {
        // 読み込みが終わっていれば最終的なテキストを表示する。
        //console.log(veryLongText);
        
        let promise = new Promise<string>((resolve,reject)=>{
          if(veryLongText!=undefined){
            resolve('ok');
          }else{
            reject('cant catch data!');
          }
        });
        return promise;
      }
      veryLongText += decoder.decode(value);
      //await wait(5000);
      // 次の値を読みにいく。
      reader.read().then(await readChunk2);
    }
    
    await reader.read().then(async function ({done,value})
    {
      await readChunk2({done,value});
    });
    return await new Promise<string>((resolve,reject)=>{
      if(veryLongText!=undefined){
        resolve(veryLongText);
      }else{
        reject('cant catch data!');
      }
    })
    
  });
  }catch(err){
    console.log(err);
  }
  //return response.json(); // レスポンスの JSON を解析
}

// GET メソッドの実装の例
async function getData(url = '') 
{
  // 既定のオプションには * が付いています
  const response = await fetch(url, {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'accept':'application/json',
      'Content-Type': 'text/plain'
    }
    }).then(res=>{
    return res;
  })
  return response; // レスポンスの JSON を解析
}
