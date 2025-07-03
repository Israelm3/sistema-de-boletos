import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BoletoService {
  private apiUrl = 'http://localhost:4000/api/boletos'; // URL de la API

  constructor(private http: HttpClient) {}

  // Método para obtener todos los boletos y ordenarlos por fecha de emisión
  obtenerBoletos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map((boletos) => {
        // Ordenamos los boletos por horaEmision (de más reciente a más antiguo)
        boletos.sort((a, b) => {
          const fechaA = new Date(a.horaEmision).getTime();
          const fechaB = new Date(b.horaEmision).getTime();
          return fechaB - fechaA; // Orden descendente: el más reciente primero
        });
        return boletos;
      })
    );
  }

  // Método para obtener el boleto más reciente
  obtenerBoletoMasReciente(): Observable<any> {
    return this.obtenerBoletos().pipe(
      map((boletos) => boletos[0]) // Obtener el primer boleto, que será el más reciente
    );
  }
}