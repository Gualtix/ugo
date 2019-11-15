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

  //FSElement -------------------------------------------------------------------------------------------
  ugo         :string = "";
  owner_name  :string = "";
  FSE_name    :string = "";
  origin_name :string = "";
  origin_id   :string = "";
  dest_name   :string = "";
  dest_id     :string = "";
  txt         :string = "";

  abs_path:string  = "";
  new_name: string = "";

  SelectedNode:any = null;

  root_id: string = "";

  newtxt: string = "";
  



  constructor(private FSY:FsyncService,@Inject(LOCAL_STORAGE) private storage: WebStorageService,) { }

  ngOnInit() {
    this.getFromLocal("userlogged");
    let userid = this.data['userlogged'];
    let Params = userid.split('#');
    this.root_id = Params[0]+"#"+Params[1]+"#"+"0"; 
    this.getFSJSon(this.root_id);
    this.getUser(userid);
    this.hide_all();
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

  setElementInfo(Element:any){
    this.txt = Element.data;
    this.FSE_name = Element.label;
    this.owner_name = Element.owner_name;
    this.ugo = Element.ugo;
    this.abs_path = Element.abs_path;
  }

  nodeSelect(evt: any): void {
    this.TreeScope = [];
    this.setElementInfo(evt.node);
    this.SelectedNode = evt.node;
    //console.log(evt.node.label);
    let Ch = evt.node.children;
    let i = 0;
    let n = Ch.length;
    while(i < n){
      this.TreeScope.push({label:Ch[i].label,type:Ch[i].type,img_url:Ch[i].img_url});
      i++;
    }

    //console.log(evt.node);
  }

  //Util --------------------------------------------------------------------------------------------
  hide_all(){
    document.getElementById("html_renombrar").style.display = "none";
    document.getElementById("html_eliminar").style.display = "none";
    document.getElementById("html_copiar").style.display = "none"; 
    document.getElementById("html_mover").style.display = "none"; 
    document.getElementById("html_editar").style.display = "none"; 
  }

  
  //Clean -------------------------------------------------------------------------------------------
  cleanInfo(){

    this.TreeScope = [];
    this.ugo         = "";
    this.owner_name  = "";
    this.FSE_name    = "";
    this.origin_name = "";
    this.origin_id   = "";
    this.dest_name   = "";
    this.dest_id     = "";
    this.txt         = "";

    this.abs_path    = "";
    this.new_name    = "";

    this.SelectedNode = null;

    this.newtxt = "";
  
  }

  //Validate --------------------------------------------------------------------------------------------------
  val_sys(cmd:string){

    if(this.FSE_name == ""){
      alert("Seleccione un Folder o Archivo");
      return 0;
    }

    if(this.FSE_name == "/"){
      alert("El Folder / NO puede Modificarse");
      return 0;
    }

    if(this.FSE_name == "users.txt"){
      alert("El Archivo users.txt NO puede Modificarse");
      return 0;
    }


    //rename ------------------------------------------------------------------------------
    if(cmd == "rename"){
      if(this.new_name == ""){
        alert("El Nuevo Nombre esta en Blanco");
        return 0;
      }

      //console.log(this.SelectedNode.fid);
      /* Ya existe el mismo nombre
      let i = 0;
      let n = this.SelectedNode.children.length;
      while(i < n){
        let tmp = this.SelectedNode.children[i].label;
        if(tmp == this.FSE_name){
          alert("Ya Existe una Carpeta con ese Nombre");
          return;
        }
        i++;
      }
      */

    }

    //edit ------------------------------------------------------------------------------
    if(cmd == "edit"){
      if(this.SelectedNode.type == "folder"){
        alert("No se puede Editar un Folder");
        return 0;
      }
    }

    return 1;
    
  }
  //Confimr --------------------------------------------------------------------------------------------------
  editar_confirm(){
    let rs = this.val_sys("edit"); 
    if(rs == 0){
      return;
    }

    this.FSY.makeFSE_Change
    (
      {
        op:"edit",
        fse_id:this.SelectedNode.id,
        newtxt:this.newtxt
      }
    ).subscribe
      (
        res => {
          this.getFSJSon(this.root_id); 
        },
        err => console.error(err)
      );

    alert("Elemento Editado Exitosamente")

    this.cleanInfo();
    this.hide_all(); 
  }
  
  renombrar_confirm(){

    let rs = this.val_sys("rename"); 
    if(rs == 0){
      return;
    }

    this.FSY.makeFSE_Change
    (
      {
        op:"rename",
        fse_id:this.SelectedNode.id,
        new_name:this.new_name
      }
    ).subscribe
      (
        res => {
          this.getFSJSon(this.root_id); 
        },
        err => console.error(err)
      );

    alert("Elemento Renombrado Exitosamente")

    this.cleanInfo();
    this.hide_all(); 
  }

  //Click ----------------------------------------------------------------------------------------
  click_newfolder(){
    this.hide_all();
    document.getElementById("html_newfolder").style.display = "block";
  }

  click_newfile(){
    this.hide_all();
    document.getElementById("html_newfile").style.display = "block";
  }
  click_renombrar(){
    this.hide_all();
    document.getElementById("html_renombrar").style.display = "block";
  }

  click_eliminar(){
    this.hide_all();
    document.getElementById("html_eliminar").style.display = "block";
  }

  click_copiar(){
    this.hide_all();
    document.getElementById("html_copiar").style.display = "block";
  }

  click_mover(){
    this.hide_all();
    document.getElementById("html_mover").style.display = "block";
  }

  click_editar(){
    this.hide_all();
    document.getElementById("html_editar").style.display = "block";
  }
}
