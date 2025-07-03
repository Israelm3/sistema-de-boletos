import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../api.service';
import { BoletoService } from '../boleto.service'; 

@Component({
  standalone: true,
  selector: 'app-boleto',
  imports: [RouterModule, CommonModule],
  templateUrl: './boleto.component.html',
  styleUrl: './boleto.component.css'
})
export class BoletoComponent implements OnInit {
  siguienteIdUser: number | null = null;
  boletoReciente: any = null; // Variable para almacenar el boleto con el id_user más grande
  mensajeError: string | null = null;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.obtenerBoletoConMayorIdUser();
  }

  obtenerBoletoConMayorIdUser(): void {
    this.apiService.obtenerBoletos().subscribe(
      (response: any) => {
        console.log('Respuesta del servidor:', response);
        if (response && response.length > 0) {
          // Encontrar el boleto con el id_user más grande
          this.boletoReciente = response.reduce((maxBoleto: any, currentBoleto: any) => {
            return (currentBoleto.id_user > maxBoleto.id_user) ? currentBoleto : maxBoleto;
          });
          console.log('Boleto con el id_user más grande:', this.boletoReciente);
        } else {
          this.mensajeError = 'No se encontró ningún boleto en la base de datos';
        }
      },
      (error) => {
        this.mensajeError = 'Error al obtener los boletos';
        console.error(this.mensajeError, error);
      }
    );
  }
}
