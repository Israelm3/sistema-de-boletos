import { ApplicationConfig } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { RecargaComponent } from './recarga/recarga.component';
import { BoletoComponent } from './boleto/boleto.component';
import { AcercaDeComponent } from './acerca-de/acerca-de.component';
import { DudasSoporteComponent } from './dudas-soporte/dudas-soporte.component';
import { provideHttpClient, withFetch } from '@angular/common/http';




const routes: Routes = [
  { path: '', component: HomeComponent }, // Página principal
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'recarga', component: RecargaComponent},
  { path: 'home', component: HomeComponent },
  { path: 'boleto', component: BoletoComponent},
  { path: 'acerca-de', component: AcercaDeComponent},
  { path: 'dudas/soporte', component: DudasSoporteComponent}
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch())
  ]
};

