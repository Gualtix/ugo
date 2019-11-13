import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import * as $ from 'jquery';
import { FsyncService } from '../../services/fsync.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  public slogan: string   = "El mejor sisma gestor de archivos";
  public img_url:string   = "http://localhost:3000/img/logo.jpeg";

  public video_url:string = "http://localhost:3000/video/nature.mp4";
  public status:string    = "Status!";

  public mision: string   = "El mejor sisma gestor de archivos";
  public vision: string   = "El mejor sisma gestor de archivos";
  public about: string   = "El mejor sisma gestor de archivos";

  public username: string = "";
  public password: string = "";

  constructor(private _sanitizer: DomSanitizer,private FSY:FsyncService) { }

  getSaveVideo(){

    return this._sanitizer.bypassSecurityTrustResourceUrl(this.video_url);
  }

  ngOnInit() {
    this.getWelcomeInfo();
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
          this.status = (<any>res).msg;
        },
        err => console.error(err)
      );
  }
}
