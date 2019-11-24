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

  fetchJournal(){
    return this.http.get(`${this.API_URI}/fetchJournal`);
  }   

  fetch_rp_uno(dt:string){
    return this.http.post(`${this.API_URI}/fetch_rp_uno`,{date:dt});
  } 
  
  fetch_rp_dos(fse:string,dty:string,dtz){
    return this.http.post(`${this.API_URI}/fetch_rp_dos`,{FSE:fse,date_y:dty,date_z:dtz});
  } 

  fetch_rp_tres(dty:string){
    return this.http.post(`${this.API_URI}/fetch_rp_tres`,{date_y:dty});
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
