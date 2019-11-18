import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import * as $ from 'jquery';
import { FsyncService } from '../../services/fsync.service';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
import { Inject } from '@angular/core'; 
import { Router, UrlSerializer } from '@angular/router';
import { User } from '../../models/mdf';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})


export class WelcomeComponent implements OnInit {

  usr:User = new User();

  public data:any=[];

  public slogan: string   = "El mejor sisma gestor de archivos";
  public img_url:string   = "http://localhost:3000/img/logo.jpeg";

  public video_url:string = "http://localhost:3000/video/nature.mp4";
  public status:string    = "Status!";

  public mision: string   = "El mejor sisma gestor de archivos";
  public vision: string   = "El mejor sisma gestor de archivos";
  public about: string    = "El mejor sisma gestor de archivos";

  public username: string = "";
  public password: string = "";

  constructor(private _sanitizer: DomSanitizer,private FSY:FsyncService,@Inject(LOCAL_STORAGE) private storage: WebStorageService,private router: Router) { }

  getSaveVideo(){
    return this._sanitizer.bypassSecurityTrustResourceUrl(this.video_url);
  }

  ngOnInit() {
    this.getWelcomeInfo();
    this.hideall();
    document.getElementById("html_login").style.display = "block";
  }

  getWelcomeInfo(){

    this.FSY.getWelcomeInfo()
      .subscribe(
        res => {
          this.slogan    = (<any>res).SLOGAN; 
          this.img_url   = (<any>res).LOGO;
          this.video_url = (<any>res).VIDEO;
          this.mision    = (<any>res).MISION;
          this.vision    = (<any>res).VISION;
          this.about     = (<any>res).ABOUT;
          this.getSaveVideo();
        },
        err => console.error(err)
      );
  }

  authenticate(){
    this.FSY.authenticate(this.username,this.password)
      .subscribe(
        res => {  
          //this.status = (<any>res).msg;
          alert((<any>res).msg);
          if((<any>res).ok == 1){
            this.saveInLocal("userlogged",(<any>res).id);
            this.router.navigateByUrl('/fsedit');
          }
        },
        err => console.error(err)
      );
  }

  register(){

    if(this.usr.nombre == ""){
      alert("Nombre Invalido");
      return;
    }

    if(this.usr.password == ""){
      alert("Password Invalido");
      return;
    }

    if(this.usr.nacimiento == ""){
      alert("Fecha de Nacimiento Invalida");
      return;
    }

    this.FSY.register(this.usr)
      .subscribe(
        res => {  
          alert((<any>res).msg);
          if((<any>res).ok == 1){
            //this.saveInLocal("userlogged",(<any>res).id);
            window.location.reload();
            //this.router.navigateByUrl('/welcome');
          }
        },
        err => console.error(err)
      );
      
  }

  saveInLocal(key, val): void {
    //console.log('recieved= key:' + key + 'value:' + val);
    this.storage.set(key, val);
    this.data[key]= this.storage.get(key);
  }

  getFromLocal(key): void {
    //console.log('recieved= key:' + key);
    this.data[key]= this.storage.get(key);
    //console.log(this.data);
  }

  hideall(){
    document.getElementById("html_login").style.display = "none";
    document.getElementById("html_registro").style.display = "none";
  }

  login_click(){
    this.hideall();
    document.getElementById("html_login").style.display = "block";
  }

  registro_click(){
    this.hideall();
    document.getElementById("html_registro").style.display = "block";
  }


}
