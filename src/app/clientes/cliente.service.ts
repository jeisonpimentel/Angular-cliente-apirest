import { Injectable } from '@angular/core';
import { formatDate, DatePipe} from '@angular/common';
import { Cliente } from './cliente';
import { Region } from './region';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent} from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Injectable()
export class ClienteService {

  private urlEndPoint : string = 'http://localhost:8080/api/clientes';
  private httpHeader : HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(
    private http: HttpClient,
    private router: Router) { }

  private noAutorizado(e) : boolean {
    if(e.status == 401 || e.status == 403)
    {
      this.router.navigate(['/login']);
      return true;
    } else{
      return false;
    } 
  }

  getRegiones() : Observable<Region[]>
  {
    return this.http.get<Region[]>(this.urlEndPoint + '/regiones').pipe(
      catchError(e => {
        this.noAutorizado(e);
        return throwError(e);
      })
    );
  }

  getClientes(page: number) : Observable<Cliente[]> 
  {
    return this.http.get(this.urlEndPoint + '/page/' + page).pipe(
      tap( (response : any)=> {
        //console.log('ClienteService: Transmitiendo flujo TAP 1');
        (response.content as Cliente[]).forEach(cliente => {
          
        })
      }),
      map((response: any) => {
        (response.content as Cliente[]).map(cliente => {
          cliente.nombre = cliente.nombre.toUpperCase();
          let datePipe = new DatePipe('es');
          cliente.createAt = datePipe.transform(cliente.createAt, 'EEEE dd, MMMM yyyy'); //formatDate(cliente.createAt, 'dd-MM-yyyy', 'en-US');
          return cliente;
        });
        return response;
      }),
      tap(response => {
        //  console.log('ClienteService: Transmitiendo flujo tap 2');
        (response.content as Cliente[]).forEach(cliente => {
          
        })
      })
    );
  }

  create(cliente: Cliente) : Observable<any>
  {
    return this.http.post<any>(this.urlEndPoint, cliente, {headers: this.httpHeader}).pipe(
      catchError(e => {

        if(this.noAutorizado){
          return throwError(e);
        }
        
        if(e.status==400){
          return throwError(e);
        }

        console.error(e.error.mensaje);
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  getCliente(id) : Observable<Cliente>
  {
    return this.http.get(`${this.urlEndPoint}/${id}`).pipe(
      map( (response : any) => response.cliente as Cliente), 
      catchError(e => {

        if(this.noAutorizado){
          return throwError(e);
        }

        this.router.navigate(['/clientes']);
        console.error(e.error.mensaje);
        swal.fire(e.error.error, e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  update(cliente : Cliente) : Observable<Cliente> 
  {
    return this.http.put(`${this.urlEndPoint}/${cliente.id}`, cliente, {headers: this.httpHeader}).pipe(
      map( (response : any) => response.cliente as Cliente),
      catchError(e => {

        if(this.noAutorizado){
          return throwError(e);
        }

        //Aca enviamos el error, para ser capturado en el metodo
        //En el componente del formulario. 
        if(e.status==400){
          return throwError(e);
        }

        console.error(e.error.mensaje);
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  delete(id : number) : Observable<Cliente> 
  {
    return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeader}).pipe(
      catchError(e => {

        if(this.noAutorizado){
          this.router.navigate(['/login'])
          return throwError(e);
        }

        console.error(e.error.mensaje);
        swal.fire(e.error.error, e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  subirFoto(archivo : File, id) : Observable<HttpEvent<{}>> 
  {

    let formData = new FormData();
    formData.append("archivo", archivo);
    formData.append("id", id);

    const req = new HttpRequest('POST', `${this.urlEndPoint}/upload`, formData, {
      reportProgress: true
    });

    return this.http.request(req).pipe(
      catchError(e => {
        this.noAutorizado(e);
        return throwError(e);
      })
    );;
  };


}
