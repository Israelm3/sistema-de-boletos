import { Component, ViewEncapsulation } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None,
  imports: [FormsModule, RouterModule, HttpClientModule, CommonModule]
})
export class LoginComponent {
  correo = '';
  contrasena = '';
  mensaje = '';

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit(event: Event) {
    event.preventDefault();

    this.http.post<any>('http://localhost:4000/api/usuarios/login', {
      correo: this.correo,
      contrasena: this.contrasena
    }).subscribe({
      next: (res) => {
        const usuario = res.usuario;
        console.log('Rol recibido del backend:', usuario.rol);  // <-- Aquí para debug

        const nombre = usuario.nombre;
        const rol = usuario.rol;

        if (rol?.toLowerCase() === 'admin') {
          this.mensaje = `👑 Bienvenido administrador ${nombre}`;
          setTimeout(() => this.router.navigate(['/admin-panel']), 1500);
        } else {
          this.mensaje = `👋 Bienvenido ${nombre}`;
          setTimeout(() => this.router.navigate(['/home']), 1500);
        }
      },
      error: (err) => {
        this.mensaje = err.error?.message || 'Error en inicio de sesión';
      }
    });
  }
}
