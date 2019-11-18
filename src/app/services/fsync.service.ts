import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { from } from 'rxjs/observable/from';



@Injectable()
export class FsyncService {

  API_URI = 'http://localhost:3000';

  constructor(private http: HttpClient) { 
    
  }

  authenticate(usn: string,psw:string){
    return this.http.post(`${this.API_URI}/user/authenticate`, {username: usn,password: psw});
  }

  getWelcomeInfo(){
    return this.http.get(`${this.API_URI}/welcome`);
  }

  getUser(user_id: string){
    return this.http.post(`${this.API_URI}/user`, {usid: user_id}); //dd
  }


  getFSJson(user_id: string) {
    var config = {
      headers: { 
        'Content-type': 'application/json' 
      },
      'dataType': 'json'
    };
    let headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');

    //let headers = new HttpHeaders().set('Content-Type', 'text/plain');

    //const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    /*
    return this.http.post
    (
      `${this.API_URI}/sync/pull_fs`, 
      "somaster", 
      { headers, responseType: 'text'}

    );
    */

    //let JS = JSON.stringify({usid: user_id});
    //let params = 'user='+JS;

    //return this.http.post(`${this.API_URI}/sync/pull_fs`,JS, { headers: headers });
    //let USR = 
    //{usid:user_id}
    //let Origi:string = JSON.stringify(USR)
    //console.log(Origi);

    return this.http.post(`${this.API_URI}/sync/pull_fs`,{usid:user_id});
  }

  makeFSE_Change(fse_info:any){
    return this.http.post(`${this.API_URI}/fsdb/fschanges`,fse_info);
  }
}    
