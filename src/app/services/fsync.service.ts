import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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


  getFSJson(user_id: string) {
    var config = {
      headers: { 'Content-type': 'application/json' },
      'dataType': 'json'
    };
    //return this.http.get(`${this.API_URI}/sync/pull_fs/${id}`);
    //this.http.post(this.API_URI+"/sync/pull_fs",{usid: user_id},config);
    return this.http.post(`${this.API_URI}/sync/pull_fs`, {usid: user_id});
  }
}
