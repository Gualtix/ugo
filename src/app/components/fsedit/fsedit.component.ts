import { Component, OnInit, HostBinding } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { FsyncService } from '../../services/fsync.service';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
import { Inject } from '@angular/core'; 

@Component({
  selector: 'app-fsedit',
  templateUrl: './fsedit.component.html',
  styleUrls: ['./fsedit.component.css']
})
export class FseditComponent implements OnInit {

  //@HostBinding('class') classes = 'row';

  files: TreeNode[];
  JSonTree: any = [];

  data: any=[];
  UserLogged: any;


  GroupName :string = "";
  Montaje   :string = "";
  Disco     :string = "";
  Particion :string = "";
  Roll      :string = "";
  Cliente   :string = "";

  TreeScope :any = [];

  


  constructor(private FSY:FsyncService,@Inject(LOCAL_STORAGE) private storage: WebStorageService,) { }

  ngOnInit() {
    this.getFromLocal("userlogged");
    let userid = this.data['userlogged'];
    this.getFSJSon(userid);
    this.getUser(userid);
  }

  setUserInfo(){
    let GID: string = this.UserLogged.ID;

    let Params = GID.split('#');

    this.Disco     = Params[0];
    this.Particion = Params[1];
    this.Cliente = this.UserLogged.NOMBRE;
    if(this.UserLogged.FK_ROLEID_ID == 0){
      this.Roll = 'Usuario';
    }

    else if(this.UserLogged.FK_ROLEID_ID == 1){
      this.Roll = 'Root';
    }
    else{
      this.Roll = 'Administrador';
    }

    this.Montaje   = this.UserLogged.MOUNT;
    this.GroupName = this.UserLogged.GRUPO;
  }

  getUser(userid:string){
    this.FSY.getUser(userid).subscribe(
      res => {
        this.UserLogged = res;
        this.setUserInfo();
      },
      err => console.error(err)
    );
  }

  imprime(){
    console.log(this.JSonTree.dt);
    this.files = this.JSonTree.dt;
  }

  getFSJSon(id:string){
    this.FSY.getFSJson(id)
      .subscribe(
        res => {
          this.JSonTree = (<any>res).dt;
          this.files = this.JSonTree;
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

  nodeSelect(evt: any): void {
    this.TreeScope = [];
    //console.log(evt.node.label);
    let Ch = evt.node.children;
    let i = 0;
    let n = Ch.length;
    while(i < n){
      this.TreeScope.push({label:Ch[i].label,type:Ch[i].type,img_url:Ch[i].img_url});
      i++;
    }

    console.log(this.TreeScope);
  }
}
