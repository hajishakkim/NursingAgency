import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ModulesComponent } from './modules/modules.component';
import { AuthGuard } from './auth/auth.guards';

const routes: Routes = [
  //{ path: '',   redirectTo: '', pathMatch: 'full' },
  { path: 'login',   component: LoginComponent },
  {
     path : '',
     component : ModulesComponent,
     canActivate : [AuthGuard],
     children : [
      {
        path : '',
        loadChildren : () => import('./modules/modules.module').then(m => m.ModulesModule)
      }
     ]
   }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
