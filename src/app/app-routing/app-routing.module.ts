import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';

import { WelcomeComponent } from '../components/welcome/welcome.component';
import { FseditComponent} from '../components/fsedit/fsedit.component';

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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
