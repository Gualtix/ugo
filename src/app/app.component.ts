import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { TreeNode } from 'primeng/api';



@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  //private _url: string = 'https://raw.githubusercontent.com/primefaces/primeng/master/src/assets/showcase/data/files.json';
  files: TreeNode[];

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.files = [
        {
            "label": "Documents",
            "expandedIcon": "fa fa-folder-open",
            "collapsedIcon": "fa fa-folder",
            "children": [{
                    "label": "Work",
                    "expandedIcon": "fa fa-folder-open",
                    "collapsedIcon": "fa fa-folder",
                    "children": [{"label": "Expenses.doc", "icon": "fa fa-file-word-o", "data": "Expenses Document"}, {"label": "Resume.doc", "icon": "fa fa-file-word-o", "data": "Resume Document"}]
                },
                {
                    "label": "Home",
                    "expandedIcon": "fa fa-folder-open",
                    "collapsedIcon": "fa fa-folder",
                    "children": [{"label": "Invoices.txt", "icon": "fa fa-file-word-o", "data": "Invoices for this month"}]
                }]
        },
        {
            "label": "Pictures",
            "expandedIcon": "fa fa-folder-open",
            "collapsedIcon": "fa fa-folder",
            "children": [
                {"label": "barcelona.jpg", "icon": "fa fa-file-image-o", "data": "Barcelona Photo"},
                {"label": "logo.jpg", "icon": "fa fa-file-image-o", "data": "PrimeFaces Logo"},
                {"label": "primeui.png", "icon": "fa fa-file-image-o", "data": "PrimeUI Logo"}]
        },
        {
            "label": "Movies",
            "data": "Movies Folder",
            "expandedIcon": "fa fa-folder-open",
            "collapsedIcon": "fa fa-folder",
            "children": [{
                    "label": "Al Pacino",
                    "data": "Pacino Movies",
                    "children": [{"label": "Scarface", "icon": "fa fa-file-video-o", "data": "Scarface Movie"}, {"label": "Serpico", "icon": "fa fa-file-video-o", "data": "Serpico Movie"}]
                },
                {
                    "label": "Robert De Niro",
                    "data": "De Niro Movies",
                    "children": [{"label": "Goodfellas", "icon": "fa fa-file-video-o", "data": "Goodfellas Movie"}, {"label": "Untouchables", "icon": "fa fa-file-video-o", "data": "Untouchables Movie"}]
                }]
        }
    ]




  }

  nodeSelect(evt: any): void {
    console.log(evt.node);
  }
}
