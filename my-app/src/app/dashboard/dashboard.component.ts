//"use strict";
//import { HttpClient, HttpHandler, HttpHeaders, JsonpClientBackend } from '@angular/common/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { ComponentFixtureNoNgZone } from '@angular/core/testing';
//import { gunzip } from 'zlib';
import { AccountService, Configuration, RegisterAccount } from '../tsplanApi';

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

  // ボタンクリック時に現在時刻を表示
  onclick() {
    this.result = `現在時刻は、${new Date().toLocaleTimeString()}です。`;
    
    var config=new Configuration();
    config.username="sakaitri@gmail.com";
    config.password="pxi13351";

   var test =new RegisterAccountTsPlan(); 
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

    //optionData('https://tsplanning.azurewebsites.net/api/Account');
    
    postData('http://localhost:54248/api/Account',{
      "password": 'pxi13351',
      "userName": 'sakaitri@gmail.com'})
    .then(data=>{
      console.log(data);
    });
    
    /*
    try{
        var api=new AccountService(this.http,null,config);
        return api.apiAccountPost(test,observe,false);
      
    console.log;

    }
    catch(error)
    {
      console.error();
      
    }*/

  }
}
//Optionメソッド
async function optionData(url = '') 
{
  try{
    await fetch(url, {
      method: 'OPTION', 
      headers: {
        'Origin': 'https://localhost:4040',
        'Access-Control-Request-Method': 'POST',
        'Access-Control-Request-Headers': 'Content-Type,application/json-patch+json'
      },
    }).then(res=>{
    });
  }catch(err){
    console.log(err);
  }
}
// POST メソッドの実装の例
async function postData(url = '', data = {
}) 
{
try{
  // 既定のオプションには * が付いています
  const response = await fetch(url, {
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
  /*
  }).then(res=>{
    return res.json;
  })*/
  
  }).then(async response=>{ 
    // 結果を数えるための変数
    let count = 0;
    // response.body にレスポンス本文のストリーム（ReadableStream）が入っている
    // ストリームのReaderを作成
    const reader = response.body.getReader();
    while (true) {
      // ストリームからデータを読む
      const {done, value} = await reader.read();
      if (done) {
        // doneがtrueならストリームのデータを全部読み終わった
        var datastr=  value.toString;
        break;
      }
    }
    /*
      // 読んだデータはバイナリデータ（Uint8Array）で与えられる
      for (const char of value) {
        // 文字'<' (0x3c) を見つけたらカウント
        if (char === 0x3c) {
          count++;
        }
      }
    */
    
  return datastr;
  
 return response.json;
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
class RegisterAccountTsPlan implements RegisterAccount{

}