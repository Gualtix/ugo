import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { from } from 'rxjs/observable/from';
import { User } from '../models/mdf';


@Injectable()
export class FsyncService {

  API_URI = 'http://localhost:3000';

  constructor(private http: HttpClient) { 
    
  }

  authenticate(usn: string,psw:string){
    return this.http.post(`${this.API_URI}/user/authenticate`, {username: usn,password: psw});
  }

  register(user:User){
    return this.http.post(`${this.API_URI}/user/newuser`,user);
  }

  getWelcomeInfo(){
    return this.http.get(`${this.API_URI}/welcome`);
  }

  getUser(user_id: string){
    return this.http.post(`${this.API_URI}/user`, {usid: user_id}); //dd
  }


  getFSJson(user_id: string) {
    return this.http.post(`${this.API_URI}/sync/pull_fs`,{usid:user_id});
  }

  makeFSE_Change(fse_info:any){
    return this.http.post(`${this.API_URI}/fsdb/fschanges`,fse_info);
  }
}    
