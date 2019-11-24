import { Component, OnInit, HostBinding } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { FsyncService } from '../../services/fsync.service';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { Inject } from '@angular/core'; 
import * as $ from 'jquery';

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
  Part_ID   :string = "";
  Roll      :string = "";
  Cliente   :string = "";


  TreeScope :any = [];

  //FSElement -------------------------------------------------------------------------------------------
  ugo         :string = "";
  new_ugo     :string = "";
  owner_name  :string = "";
  FSE_name    :string = "";

  origin_name :string = "";
  origin_id   :string = "";

  dest_name   :string = "";
  dest_id     :string = "";
  dest_path   :string = "";
  txt         :string = "";

  abs_path:string  = "";
  new_name: string = "";

  SelectedNode:any = null;

  root_id: string = "";

  newtxt: string = "";

  DestNode:any = "";
  SFlag: boolean = false;
  



  constructor(private FSY:FsyncService,@Inject(LOCAL_STORAGE) private storage: WebStorageService,) { }

  ngOnInit() {
    this.getFromLocal("userlogged");
    let userid = this.data['userlogged'];
    let Params = userid.split('#');
    this.root_id = Params[0]+"#"+Params[1]+"#"+"0"; 
    this.getUser(userid);
    this.getFSJSon(this.root_id);
    this.hide_all();
  }

  setUserInfo(){
    let GID: string = this.UserLogged.ID;

    let Params = GID.split('#');

    this.Disco     = Params[0];
    this.Particion = Params[1];
    this.Part_ID   = this.Disco+"#"+this.Particion;
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
    console.log("Antes de INgreae");
    this.FSY.getFSJson(id)
      .subscribe(
        res => {
          this.JSonTree = (<any>res).dt;
          this.files = this.JSonTree;
          console.log((<any>res).dt);
          console.log("Ingreso");
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

    if(this.SFlag){
      this.DestNode  = evt.node;
      this.SFlag     = false;
      this.dest_path = this.DestNode.abs_path;

      let rs = this.val_sys("move"); 
      if(rs == 0){
        this.SFlag     = true;
        this.dest_path = "";
        this.DestNode  = null;
      }else{
        this.SFlag     = false;
      }
      return;
    }

    this.hide_all();
    this.cleanInfo();

    this.TreeScope = [];
    this.setElementInfo(evt.node);
    this.SelectedNode = evt.node;
    this.newtxt = this.txt;
    //console.log(evt.node.label);
    let Ch = evt.node.children;
    let i = 0;
    let n = Ch.length;
    while(i < n){
      this.TreeScope.push({label:Ch[i].label,type:Ch[i].type,img_url:Ch[i].img_url});
      i++;
    }
  }



  
  //Clean -------------------------------------------------------------------------------------------
  cleanInfo(){

    this.TreeScope = [];
    this.ugo         = "";
    this.new_ugo     = "";
    this.owner_name  = "";
    this.FSE_name    = "";
    this.origin_name = "";
    this.origin_id   = "";
    this.dest_name   = "";
    this.dest_id     = "";
    this.txt         = "";

    this.abs_path    = "";
    this.new_name    = "";

    this.dest_path = "";
    this.SFlag = false;

    this.SelectedNode = null;
    this.DestNode = null;

    this.newtxt = "";
  
  }

  //Validate --------------------------------------------------------------------------------------------------
  val_sys(cmd:string){

    //move ------------------------------------------------------------------------------
    if(cmd == "move"){
      if(this.DestNode == null){
        alert("Debe Seleccionar el Folder Destino");
        return 0;
      }

      if(this.DestNode.type == 'file'){
        alert("El Destino NO Puede ser un Archivo");
        return 0;
      }

      if(this.SelectedNode.id == this.DestNode.id){
        alert("No puede seleccionar como Destino el mismo Folder de Origen");
        return 0;
      }

      console.log(this.SelectedNode);
      console.log(this.DestNode);

      if(this.SelectedNode.fid_path == "" &&  this.DestNode.abs_path == "/"){
        alert("El Folder Destino NO cambia la Ubicacion");
        return 0;
      }

      if(this.SelectedNode.fid_path == this.DestNode.abs_path){

        alert("El Folder Destino NO cambia la Ubicacion");
        return 0;
      }

      let i = 0;
      let vl: boolean = false;
      let Params = this.DestNode.abs_path.split('/');
      let n = Params.length;
      while(i < n){
        if(this.SelectedNode.label == Params[i]){
          vl = true;
        }
        i++;
      }

      if(vl){
        alert("Folder Destino Invalido");
        return 0;
      }
    }


    //rename ------------------------------------------------------------------------------
    if(cmd == "rename"){
      if(this.new_name == ""){
        alert("El Nuevo Nombre esta en Blanco");
        return 0;
      }
    }

    //newfile
    if(cmd == "newfile"){
      if(this.new_name == ""){
        alert("El Nuevo Nombre esta en Blanco");
        return 0;
      }
    }

    //newfolder
    if(cmd == "newfolder"){
      if(this.new_name == ""){
        alert("El Nuevo Nombre esta en Blanco");
        return 0;
      }
    }

    return 1;
    
  }
  //Confimr --------------------------------------------------------------------------------------------------
  eliminar_confirm(){
    this.FSY.makeFSE_Change
    (
      {
        op:"delete",
        id:this.SelectedNode.id,

        cmd:"rem",
        cmd_string:"rem -path="+this.SelectedNode.abs_path,
        user_name:this.UserLogged.NOMBRE,
        disk_name:this.Disco,
        part_name:this.Particion,
        part_id:this.Part_ID,
        usr_id:this.UserLogged.ID,
        FSE:this.SelectedNode.label
      }
    ).subscribe
      (
        res => {
          this.getFSJSon(this.root_id); 
          //console.log(res);     
        },
        err => console.error(err)
      );

    alert("Elemento Eliminado Correctamente")

    this.cleanInfo();
    this.hide_all(); 
  }

  newfolder_confirm(){
    let rs = this.val_sys("newfolder"); 
    if(rs == 0){
      return;
    }

    this.FSY.makeFSE_Change
    (
      {
        op:"newfolder",
        new_name:this.new_name,
        tipo:"folder",
        newtxt:null,
        new_ugo:this.new_ugo,
        owner_id:this.UserLogged.ID,
        fid:this.SelectedNode.id,

        cmd:"mkdir",
        cmd_string:"mkdir -path="+this.SelectedNode.abs_path+"/"+this.new_name,
        user_name:this.UserLogged.NOMBRE,
        disk_name:this.Disco,
        part_name:this.Particion,
        part_id:this.Part_ID,
        usr_id:this.UserLogged.ID,
        FSE:this.SelectedNode.label
      }
    ).subscribe
      (
        res => {
          this.getFSJSon(this.root_id); 
          //console.log(res);     
        },
        err => console.error(err)
      );

    alert("Nuevo Folder Creado Exitosamente")

    this.cleanInfo();
    this.hide_all(); 

  }

  newfile_confirm(){
    let rs = this.val_sys("newfile"); 
    if(rs == 0){
      return;
    }

    this.FSY.makeFSE_Change 
    (
      {
        op:"newfile",

        new_name:this.new_name+".txt",
        tipo:"file",
        newtxt:this.newtxt,
        new_ugo:this.new_ugo,
        owner_id:this.UserLogged.ID,
        fid:this.SelectedNode.id,
 
        cmd:"mkfile",
        cmd_string:"mkfile -path="+this.SelectedNode.abs_path+"/"+this.new_name+" -cont="+this.newtxt,
        user_name:this.UserLogged.NOMBRE,
        disk_name:this.Disco,
        part_name:this.Particion,
        part_id:this.Part_ID,
        usr_id:this.UserLogged.ID,
        FSE:this.SelectedNode.label
      }
    ).subscribe
      (
        res => {
          this.getFSJSon(this.root_id); 
          //console.log(res);     
        },
        err => console.error(err)
      );

    alert("Nuevo Archivo Creado Exitosamente")

    this.cleanInfo();
    this.hide_all(); 

  }
  
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
        newtxt:this.newtxt,

        cmd:"edit",
        cmd_string:"edit -path="+this.SelectedNode.abs_path+" -cont="+this.newtxt,
        user_name:this.UserLogged.NOMBRE,
        disk_name:this.Disco,
        part_name:this.Particion,
        part_id:this.Part_ID,
        usr_id:this.UserLogged.ID,
        FSE:this.SelectedNode.label
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

    let full_name:string = this.new_name;

    if(this.SelectedNode.type == 'file'){
      full_name = full_name+".txt";
    }

    this.FSY.makeFSE_Change
    (
      { 
        op:"rename",
        
        new_name:full_name,
        fse_id:this.SelectedNode.id,

        cmd:"ren",
        cmd_string:"ren -path="+this.SelectedNode.abs_path+" -name="+full_name,
        user_name:this.UserLogged.NOMBRE,
        disk_name:this.Disco,
        part_name:this.Particion,
        part_id:this.Part_ID,
        usr_id:this.UserLogged.ID,
        FSE:this.SelectedNode.label
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

  copiar_confirm(){
    if(this.DestNode != null){
      this.FSY.makeFSE_Change
      (
        {
          op:"copy",
          source_id:this.SelectedNode.id,
          dest_id:this.DestNode.id,
          new_name:this.SelectedNode.label,
          newtxt:this.SelectedNode.txt,
          ugo:this.SelectedNode.ugo,
          part_id:this.Part_ID,
          owner_id:this.SelectedNode.owner_id,
          fid:this.DestNode.id,
          type:this.SelectedNode.type,

          cmd:"cp",
          cmd_string:"cp -path="+this.SelectedNode.abs_path+" -dest="+this.DestNode.abs_path,
          user_name:this.UserLogged.NOMBRE,
          disk_name:this.Disco,
          part_name:this.Particion,
        
          usr_id:this.UserLogged.ID,
          FSE:this.SelectedNode.label
        }
      ).subscribe
        (
          res => {
            this.getFSJSon(this.root_id); 
          },
          err => console.error(err)
        );

      alert("Elemento Copiado Exitosamente")

      this.cleanInfo();
      this.hide_all(); 
    }
  }

  mover_confirm(){

    if(this.DestNode != null){
      this.FSY.makeFSE_Change
      (
        {
          op:"move",
          source_id:this.SelectedNode.id,
          dest_id:this.DestNode.id,

          cmd:"mv",
          cmd_string:"mv -path="+this.SelectedNode.abs_path+" -dest="+this.DestNode.abs_path,
          user_name:this.UserLogged.NOMBRE,
          disk_name:this.Disco,
          part_name:this.Particion,
          part_id:this.Part_ID,
          usr_id:this.UserLogged.ID,
          FSE:this.SelectedNode.label
        }
      ).subscribe
        (
          res => {
            this.getFSJSon(this.root_id); 
          },
          err => console.error(err)
        );

      alert("Elemento Movido Exitosamente")

      this.cleanInfo();
      this.hide_all(); 
    }
  }

  select_dest(){
    this.SFlag = true;
  }


  //Click ----------------------------------------------------------------------------------------
  click_newfolder(){
    if(this.SelectedNode == null){
      alert("Tiene que Seleccionar un Folder");
      return;
    }
    if(this.SelectedNode.type == "file"){
      alert("Tiene que Seleccionar un Folder");
      return;
    }
    this.new_ugo = "664";
    this.hide_all();
    document.getElementById("html_newfolder").style.display = "block";
  }
 
  click_newfile(){
    if(this.SelectedNode == null){
      alert("Tiene que Seleccionar un Folder");
      return;
    }
    if(this.SelectedNode.type == "file"){
      alert("Tiene que Seleccionar un Folder");
      return;
    }
    this.new_ugo = "664";
    this.hide_all();
    document.getElementById("html_newfile").style.display = "block";
  }

  click_renombrar(){
    if(this.SelectedNode == null){
      alert("Tiene que Seleccionar un Archivo / Folder");
      return;
    }
    if(this.SelectedNode.label == "/"){
      alert("El Folder: / NO puede Modificarse");
      return 0;
    }
    if(this.SelectedNode.label == "users.txt"){
      alert("El Archivo: users.txt NO puede Modificarse");
      return 0;
    }
    this.hide_all();
    document.getElementById("html_renombrar").style.display = "block";
  }

  

  click_eliminar(){
    if(this.SelectedNode == null){
      alert("Tiene que Seleccionar un Archivo / Folder");
      return;
    }
    if(this.SelectedNode.label == "/"){
      alert("El Folder: / NO puede Modificarse");
      return 0;
    }
    if(this.SelectedNode.label == "users.txt"){
      alert("El Archivo: users.txt NO puede Modificarse");
      return 0;
    }
    this.hide_all();
    document.getElementById("html_eliminar").style.display = "block";
  }

  click_copiar(){
    if(this.SelectedNode == null){
      alert("Tiene que Seleccionar un Archivo / Folder");
      return;
    }
    if(this.SelectedNode.label == "/"){
      alert("El Folder: / NO puede Modificarse");
      return 0;
    }
    if(this.SelectedNode.label == "users.txt"){
      alert("El Archivo: users.txt NO puede Modificarse");
      return 0;
    }
    this.hide_all();
    document.getElementById("html_copiar").style.display = "block";
  }

  click_mover(){
    if(this.SelectedNode == null){
      alert("Tiene que Seleccionar un Archivo / Folder");
      return;
    }
    if(this.SelectedNode.label == "/"){
      alert("El Folder: / NO puede Modificarse");
      return 0;
    }
    if(this.SelectedNode.label == "users.txt"){
      alert("El Archivo: users.txt NO puede Modificarse");
      return 0;
    }
    this.hide_all();
    document.getElementById("html_mover").style.display = "block";
  }

  click_editar(){
    if(this.SelectedNode == null){
      alert("Tiene que Seleccionar un Archivo");
      return;
    }
    if(this.SelectedNode.type == "folder"){
      alert("Tiene que Seleccionar un Archivo");
      return 0;
    }
    if(this.SelectedNode.label == "users.txt"){
      alert("El Archivo: users.txt NO puede Modificarse");
      return 0;
    }
    this.hide_all();
    document.getElementById("html_editar").style.display = "block";
    this.newtxt = this.txt;
  }

  //Util --------------------------------------------------------------------------------------------
  hide_all(){
    document.getElementById("html_renombrar").style.display = "none";
    document.getElementById("html_eliminar").style.display = "none";
    document.getElementById("html_copiar").style.display = "none"; 
    document.getElementById("html_mover").style.display = "none"; 
    document.getElementById("html_editar").style.display = "none"; 
    document.getElementById("html_newfolder").style.display = "none"; 
    document.getElementById("html_newfile").style.display = "none"; 
  }

}
