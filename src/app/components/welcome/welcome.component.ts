import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  public video_url:string = "http://localhost:3000/video/nature.mp4";
  public img_url:string = "http://localhost:3000/img/logo.jpeg";

  constructor(private _sanitizer: DomSanitizer) { }

  getSaveVideo(){
    return this._sanitizer.bypassSecurityTrustResourceUrl(this.video_url);
  }

  ngOnInit() {
    //this.video_url = "http://localhost:3000/video/nature.mp4";

  }

}
