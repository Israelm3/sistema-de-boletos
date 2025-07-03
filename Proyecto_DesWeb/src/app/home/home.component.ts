import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  boleto = {
    origen: '',
    destino: '',
    fecha: '',
    precio: 0,
    numeroPasajeros: 0,
    asiento: '',
    estado: '',
    metodoPago: '',
    categoriaAsiento: '',
    horaEmision: new Date().toISOString(),
    detallesViaje: [''],
    usuarioId: 5,
  };

  mensajeError: string | null = null;
  mensajeExito: string | null = null;

  constructor(private apiService: ApiService, private router: Router) {}

  // ⚙️ Se ejecuta al iniciar el componente
  ngOnInit(): void {
    console.log('🏠 Componente Home inicializado');
  }

  generarAsientoAleatorio(): string {
    const letra = ['A', 'B', 'C', 'D', 'E', 'F'][Math.floor(Math.random() * 6)];
    const numero = Math.floor(Math.random() * 20) + 1;
    return `${numero}${letra}`;
  }

  generarPrecioAleatorio(): number {
    return Math.floor(Math.random() * (2000 - 500 + 1)) + 500;
  }

  generarDetallesViaje(destino: string): string[] {
    return ['Viaje de ida y vuelta', `Llegada a ${destino}`];
  }

  enviarFormulario() {
    this.mensajeError = null;
    this.mensajeExito = null;

    if (
      !this.boleto.origen ||
      !this.boleto.destino ||
      !this.boleto.fecha ||
      !this.boleto.numeroPasajeros
    ) {
      this.mensajeError = 'Por favor complete todos los campos obligatorios.';
      alert(this.mensajeError);
      return;
    }

    this.boleto.numeroPasajeros = Number(this.boleto.numeroPasajeros);
    const precioUnitario = this.generarPrecioAleatorio();
    this.boleto.precio = this.boleto.numeroPasajeros * precioUnitario;

    const categoriaCapitalizada =
      this.boleto.categoriaAsiento.charAt(0).toUpperCase() +
      this.boleto.categoriaAsiento.slice(1);

    this.boleto.estado = 'Reservado';
    this.boleto.asiento = this.generarAsientoAleatorio() + ` (${categoriaCapitalizada})`;
    this.boleto.horaEmision = new Date().toISOString();
    this.boleto.detallesViaje = this.generarDetallesViaje(this.boleto.destino);

    this.apiService.crearBoleto(this.boleto).subscribe(
      (response) => {
        this.mensajeExito = 'Boleto creado exitosamente.';
        alert(this.mensajeExito);
        console.log('Boleto creado:', response);
        this.limpiarFormulario();
      },
      (error) => {
        this.mensajeError =
          error.status === 400
            ? 'Error: Datos incorrectos o incompletos.'
            : 'Error inesperado al crear el boleto.';
        alert(this.mensajeError);
        console.error('Error en API:', error);
        this.limpiarFormulario();
      }
    );
  }

  limpiarFormulario() {
    this.boleto = {
      origen: '',
      destino: '',
      fecha: '',
      precio: 0,
      numeroPasajeros: 0,
      asiento: '',
      estado: '',
      metodoPago: '',
      categoriaAsiento: '',
      horaEmision: new Date().toISOString(),
      detallesViaje: [''],
      usuarioId: 5,
    };
  }

  irALogin() {
    this.router.navigate(['/login']);
  }

  irARegistro() {
    this.router.navigate(['/register']);
  }
}
