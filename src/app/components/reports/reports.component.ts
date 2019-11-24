import { Component, OnInit } from '@angular/core';
import { FsyncService } from '../../services/fsync.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  
  
  JRList:     any = [];
  CumpleList: any = [];
  AList:      any = [];
  TrixList:   any = [];

  FSE:string = "";

  nacimiento:string = "1900-01-01";

  fech_y:string = "1900-01-01";
  fech_z:string = "2020-01-01";

  ngOnInit() {
    this.hide_all();
  }

  constructor(private FSY:FsyncService) {

  }

  //Journal ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  click_rp_bitacora(){
    this.hide_all();
    document.getElementById("tabla_bitacora").style.display = "block"; 

    this.FSY.fetchJournal().subscribe(
      res => {
        this.JRList = res;
        console.log(res);
      },
      err => console.error(err)
    );
    
  }
  //Uno ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  rp_uno_confirm(){
    if(this.nacimiento == ""){
      alert("Fecha de Nacimiento Invalida");
      return;
    }

    document.getElementById("tabla_rp_uno").style.display = "block"; 

    this.FSY.fetch_rp_uno(this.nacimiento).subscribe(
      res => {
        this.CumpleList = res;
      },
      err => console.error(err)
    );
  }

  click_rp_uno(){
    this.hide_all();
    this.CumpleList = [];
    document.getElementById("rp_uno").style.display = "block";
  }
  //Dos ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  rp_dos_confirm(){
    if(this.FSE == ""){
      alert("Ingrese el Nombre de una Carpeta o Archivo");
      return;
    }

    if(this.fech_y == ""){
      alert("Fecha Y Invalida");
      return;
    }

    if(this.fech_z == ""){
      alert("Fecha Z Invalida");
      return;
    }

    this.FSY.fetch_rp_dos(this.FSE,this.fech_y,this.fech_z).subscribe(
      res => {
        this.AList = res;
      },
      err => console.error(err)
    );


    document.getElementById("tabla_rp_dos").style.display = "block"; 

  }
  click_rp_dos(){
    this.hide_all();
    this.AList = [];
    document.getElementById("rp_dos").style.display = "block";
  }
 
  //Tres ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  rp_tres_confirm(){
    if(this.fech_y == ""){
      alert("Fecha Y Invalida");
      return;
    }
    this.FSY.fetch_rp_tres(this.fech_y).subscribe(
      res => {
        this.TrixList = res;
      },
      err => console.error(err)
    );

    document.getElementById("tabla_rp_tres").style.display = "block";
  }
  click_rp_tres(){
    this.hide_all();
    document.getElementById("rp_tres").style.display = "block";
  }
  

  //Util --------------------------------------------------------------------------------------------
  hide_all(){
    document.getElementById("rp_uno").style.display = "none";
    document.getElementById("rp_dos").style.display = "none";
    document.getElementById("rp_tres").style.display = "none"; 
    document.getElementById("tabla_bitacora").style.display = "none"; 
    document.getElementById("tabla_rp_uno").style.display = "none"; 
    document.getElementById("tabla_rp_dos").style.display = "none"; 
    document.getElementById("tabla_rp_tres").style.display = "none"; 
  }

}
