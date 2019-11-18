import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';

import { WelcomeComponent } from '../components/welcome/welcome.component';
import { FseditComponent } from '../components/fsedit/fsedit.component';
import { ReportsComponent } from  '../components/reports/reports.component';

const routes: Routes = [
  {
    path:'',
    redirectTo: '/welcome',
    pathMatch: 'full'
  },
  {
    path: 'welcome',
    component: WelcomeComponent
  },
  {
    path: 'fsedit',
    component: FseditComponent
  },
  {
    path: 'reports',
    component: ReportsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
