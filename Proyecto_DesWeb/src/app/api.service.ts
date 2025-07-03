import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://localhost:4000/api';

  constructor(private httpClient: HttpClient) { }

  // Método para registrar un usuario
  registrarUsuario(datos: any): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}/usuarios/registro`, datos)
      .pipe(catchError(this.manejarError));
  }

// Método para obtener el siguiente id_user
obtenerSiguienteIdUser(): Observable<any> {
  return this.httpClient.get(`${this.apiUrl}/boletos/siguiente-id`)
    .pipe(
      catchError(this.manejarError)
    );
}

  // Método para obtener todos los boletos
  obtenerBoletos(): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}/boletos`)
      .pipe(
        catchError(this.manejarError)
      );
  } 

  // Método para crear un nuevo boleto
  crearBoleto(datos: any): Observable<any> {
    console.log('Enviando datos:', datos);
    return this.httpClient.post(`${this.apiUrl}/boletos`, datos)
      .pipe(
        catchError(error => {
          console.error('Error en la petición:', error);
          return throwError(() => new Error(error));
        })
      );
  }

  // Método para obtener un boleto por ID
  obtenerBoletoPorId(id: string): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}/boletos/${id}`)
      .pipe(catchError(this.manejarError));
  }

  // Método para actualizar un boleto
  actualizarBoleto(id: string, datos: any): Observable<any> {
    return this.httpClient.put(`${this.apiUrl}/boletos/${id}`, datos)
      .pipe(catchError(this.manejarError));
  }

  // Método para eliminar un boleto
  eliminarBoleto(id: string): Observable<any> {
    return this.httpClient.delete(`${this.apiUrl}/boletos/${id}`)
      .pipe(catchError(this.manejarError));
  }

  // Manejo de errores
  private manejarError(error: HttpErrorResponse) {
    let mensajeError = 'Ocurrió un error desconocido';
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      mensajeError = `Error: ${error.error.message}`;
    } else {
      // Error del lado del servidor
      mensajeError = `Error ${error.status}: ${error.message}`;
    }
    console.error(mensajeError);
    return throwError(() => new Error(mensajeError));
  }
}
