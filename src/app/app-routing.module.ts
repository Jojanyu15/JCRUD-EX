import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistroComponent } from './pages/registro/registro.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './guard/auth.guard';
import { CrudComponent } from './pages/crud/crud.component';
import { NegociosComponent } from './pages/negocios/negocios.component';
import { OlvideComponent } from './pages/olvide/olvide.component';
import { NegocioComponent } from './pages/negocio/negocio.component';

const routes: Routes = [
  {
    path: 'crud',
    component: CrudComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'negocios',
        component: NegociosComponent,
      },
      {
        path: 'negocio',
        component: NegocioComponent,
      },
      {
        path: 'negocio/:id',
        component: NegocioComponent,
      },
    ],
  },
  { path: 'registro', component: RegistroComponent },
  { path: 'login', component: LoginComponent },
  { path: 'olvide', component: OlvideComponent },
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
