import { Component, OnInit } from '@angular/core';
import { FsyncService } from '../../services/fsync.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  JRList:any = [];
  

  constructor(private FSY:FsyncService) {

  }

  ngOnInit() {
    this.hide_all();
  }

  click_rp_bitacora(){
    this.hide_all();
    document.getElementById("tabla_resultados").style.display = "block"; 

    this.FSY.fetchJournal().subscribe(
      res => {
        this.JRList = res;
        console.log(res);
      },
      err => console.error(err)
    );
    
  }

  click_rp_uno(){
    this.hide_all();
    document.getElementById("rp_uno").style.display = "block";
  }

  click_rp_dos(){
    this.hide_all();
    document.getElementById("rp_dos").style.display = "block";
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
    document.getElementById("tabla_resultados").style.display = "none"; 
  }

}
