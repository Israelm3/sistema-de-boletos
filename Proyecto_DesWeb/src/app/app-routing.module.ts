import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { RecargaComponent } from './recarga/recarga.component';
import { BoletoComponent } from './boleto/boleto.component';

const routes: Routes = [
  { path: '', component: HomeComponent }, // Página principal
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'recarga', component: RecargaComponent},
  { path: 'home', component: HomeComponent},
  { path: 'boleto', component: BoletoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
