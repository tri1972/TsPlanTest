//"use strict";
//import { HttpClient, HttpHandler, HttpHeaders, JsonpClientBackend } from '@angular/common/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { ComponentFixtureNoNgZone, waitForAsync } from '@angular/core/testing';
import { rejects } from 'assert';
import { promise } from 'protractor';
//import { gunzip } from 'zlib';
import { AccountService, Configuration, RegisterAccount } from '../tsplanApi';
import accountData from '../../Account.json';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})


export class DashboardComponent  {
  message: string;
  testdata:string="testtest";
  
  /*
  private httpOptions: any = {
    // ヘッダ情報
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    // DELETE 実行時に `body` が必要になるケースがあるのでプロパティとして用意しておく
    // ( ここで用意しなくても追加できるけど... )
    body: null
  };
*/
  constructor(private http:HttpClient) 
  { 
    this.message = 'This is a sample of Angular application.';
  }
  // 変数resultを初期化
  result = '現在時刻は不明です。';

  str:string;
  // ボタンクリック時に現在時刻を表示
  async onclick() {
    this.result = `現在時刻は、${new Date().toLocaleTimeString()}です。`;
    
    var config=new Configuration();
    config.username="sakaitri@gmail.com";
    config.password="pxi13351";

    var observe: 'body'="body"; 
    /*
    getData('https://tsplanning.azurewebsites.net/api/Values').then(function(response) {
      //return response;
      return response.json();
    }).then(function(json) {
      // jsonにJSONオブジェクトで結果が渡される
      console.log(json);
    });
    */
    //http://localhost:54248/api/Values
    //https://tsplanning.azurewebsites.net/api/Values 
      var test= accountData.username;
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
