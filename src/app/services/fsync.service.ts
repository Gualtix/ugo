import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { from } from 'rxjs/observable/from';



@Injectable()
export class FsyncService {

  API_URI = 'http://localhost:3000';

  constructor(private http: HttpClient) { 
    
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



  /*
  async getFSJson(user_id:string){

    var RT;
    var config = {
      headers: { 'Content-type': 'application/json' },
      'dataType': 'json'
    };

    await this.http.post(this.API_URI+"/sync/pull_fs",{usid: user_id},config).subscribe(
        response => {
          //console.log(response.dt);
          RT = response.dt;
          
      }
    );

    console.log(RT);

    //console.log(RT);
  }
  */
}
