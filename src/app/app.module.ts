import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { TreeModule } from 'primeng/tree';
import { NavigationComponent } from './components/navigation/navigation.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { FseditComponent } from './components/fsedit/fsedit.component';
import { ReportsComponent } from './components/reports/reports.component';
import { AppRoutingModule } from './app-routing/app-routing.module';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    TreeModule,
    AppRoutingModule
  ],
  declarations: [AppComponent, NavigationComponent, WelcomeComponent, FseditComponent, ReportsComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
