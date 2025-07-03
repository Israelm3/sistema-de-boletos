import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../api.service';
import { Router } from '@angular/router';
import { NgZone } from '@angular/core';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerData = {
    nombre: '',
    correo: '',
    contrasena: '',
    confirmPassword: '',
    tipo: 'usuario' // valor por defecto
  };

  mensajeError = '';  // mensaje de error
  mensajeExito = '';  // mensaje de éxito

  // Agrego la lista de dominios permitidos
  allowedDomains = ['gmail.com', 'correo.com', 'hotmail.com'];

  // Variable para indicar si el dominio es inválido
  emailDomainInvalid = false;

  constructor(private apiService: ApiService, private router: Router, private ngZone: NgZone) {}

  // Función para validar que el correo tenga dominio permitido
  isValidEmailDomain(email: string): boolean {
    if (!email) return false;
    const domain = email.substring(email.lastIndexOf('@') + 1).toLowerCase();
    return this.allowedDomains.includes(domain);
  }

  // Método para verificar dominio cada vez que cambie el correo
  checkEmailDomain() {
    this.emailDomainInvalid = !this.isValidEmailDomain(this.registerData.correo);
  }

  onRegister() {
    this.mensajeError = '';  // limpiar mensaje previo
    this.mensajeExito = '';  // limpiar mensaje previo

    const { nombre, correo, contrasena, confirmPassword, tipo } = this.registerData;

    // Validar nombre mínimo 3 caracteres
    if (!nombre.trim() || nombre.trim().length < 3) {
      this.mensajeError = 'El nombre debe tener al menos 3 caracteres.';
      return;
    }

    // Validar correo con expresión regular sencilla
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!correo.trim() || !emailRegex.test(correo.trim())) {
      this.mensajeError = 'Favor de ingresar un correo válido.';
      return;
    }

    // Aquí valido el dominio permitido
    if (!this.isValidEmailDomain(correo.trim())) {
      this.mensajeError = `Solo se permiten correos con los dominios: ${this.allowedDomains.join(', ')}`;
      return;
    }

    // **Validación para permitir registro admin solo con correo admin@correo.com**
    if (tipo === 'admin') {
      if (correo.trim().toLowerCase() !== 'admin@correo.com') {
        this.mensajeError = 'Solo el correo admin@correo.com puede registrarse como administrador.';
        return;
      }
    }

    // Validar contraseña mínimo 6 caracteres
    if (!contrasena || contrasena.length < 6) {
      this.mensajeError = 'La contraseña debe tener al menos 6 caracteres.';
      return;
    }

    // Confirmar que contraseñas coinciden
    if (contrasena !== confirmPassword) {
      this.mensajeError = 'Las contraseñas no coinciden.';
      return;
    }

    // Si todo está bien, enviamos datos
    const datosEnviar = {
      nombre: nombre.trim(),
      correo: correo.trim(),
      contrasena,
      confirmeContrasena: confirmPassword,
      tipo  // <-- este es el cambio clave: enviar "tipo", no "rol"
    };

    console.log('Enviando datos al backend:', datosEnviar);

    this.apiService.registrarUsuario(datosEnviar).subscribe({
      next: (res) => {
        console.log('Respuesta del backend:', res);
        this.mensajeExito = `¡Registro exitoso! Bienvenido ${nombre.trim()}`;
        this.registerData = {
          nombre: '',
          correo: '',
          contrasena: '',
          confirmPassword: '',
          tipo: 'usuario'
        };
        this.mensajeError = '';
        this.emailDomainInvalid = false; // Reset también la variable
        setTimeout(() => {
          this.ngZone.run(() => this.router.navigate(['/login']));
        }, 3000);
      },
      error: (err) => {
        console.error('Error al registrar usuario:', err);
        this.mensajeError = err.error?.message || 'Error al registrar';
        this.mensajeExito = '';
      }
    });
  }
}
