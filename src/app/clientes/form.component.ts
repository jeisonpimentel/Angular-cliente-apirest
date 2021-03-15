import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { Region } from './region';
import { ClienteService} from './cliente.service';
import { Router, ActivatedRoute} from '@angular/router';
import  swal  from 'sweetalert2';
 
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  public cliente : Cliente = new Cliente();
  public regiones : Region[];
  public titulo : string = 'Crear Cliente';
  public errores : string[];

  constructor(
    private clienteService: ClienteService,
    private router : Router, 
    private activatedRoute : ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarCliente();
  }

  cargarCliente() : void
  {
    this.activatedRoute.params.subscribe(
      params => {
        let id = params['id']
        if(id)
        {
          this.clienteService.getCliente(id).subscribe(
            (cliente) => this.cliente = cliente
          )}
      });

      this.clienteService.getRegiones().subscribe(regiones => {
        this.regiones = regiones;
      });
  }

  public create() : void 
  {
    console.log(this.cliente);
    this.clienteService.create(this.cliente)
    .subscribe(
      json => { 
        this.router.navigate(['/clientes'])
        swal.fire('Nuevo Cliente', `Cliente ${json.cliente.nombre} creado con èxito!`, 'success')
    },
    err => {
      this.errores = err.error.errors as string[];
      console.log('Codigo del error desde el backend: ' + err.status);
      console.log(err.error.errors);
    }
    )
  }

  public update() : void
  {
    console.log(this.cliente);
    this.clienteService.update(this.cliente).subscribe(
      response => {
        this.router.navigate(['/clientes'])
        swal.fire('Cliente Actualizado', `Cliente ${this.cliente.nombre} actualizado correctamente!`, 'warning')
      },
      err => {
        this.errores = err.error.errors as string[];
        console.log('Codigo del error desde el backend: ' + err.status);
        console.log(err.error.errors);
      }
    )
  }

  compararRegiones(c1: Region, c2: Region): boolean {
    if(c1 === undefined && c2 === undefined)
    {
      return true;
    }
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
}
