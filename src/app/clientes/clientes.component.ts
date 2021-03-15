import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { ModalService } from '../clientes/uploads/modal.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[];
  paginador : any;
  clienteSeleccionado : Cliente;

  constructor(
    private clienteService : ClienteService,
    private router : Router,
    private activatedRoute : ActivatedRoute,
    private  modalService:  ModalService) { }

  ngOnInit(): void {
    this.getClientes();
  }

  getClientes() : void
  {
    this.activatedRoute.paramMap.subscribe(
    params => {
      let page : number = +params.get('page');

      if(!page){
        page = 0;
      }

    this.clienteService.getClientes(page).pipe(
      tap( (response : any)=> {
        console.log('ClientesComponent: tap 3');
        (response.content as Cliente[]).forEach(cliente => {
          console.log(cliente.nombre);
        })
      })
    ).subscribe(
      (response : any)  => {
        this.clientes = response.content as Cliente[]
        this.paginador = response;
    });
  });

  this.modalService.notificarUpload
  .subscribe(cliente => {
    this.clientes = this.clientes.map(clienteOriginal => {
      if(clienteOriginal.id == cliente.id) {
        clienteOriginal.foto = cliente.foto;
      }
      return clienteOriginal;
    })
  }

  )
  }

  delete(cliente : Cliente) : void 
  {
    const swalWithBootstrapButtons = swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: '¿Estás segur@?',
      text: "No podrás reversar esta operación!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {

        this.clienteService.delete(cliente.id).subscribe(
          response => {
            this.clientes = this.clientes.filter(cli=> cli !== cliente)
            swalWithBootstrapButtons.fire(
              '¡Eliminado!',
              'Cliente ha sido eliminado con éxito!.',
              'success'
            )
          }
        )  
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          '¡Cancelado!',
          'Tu cliente imaginario esta a salvo! :)',
          'error'
        )
      }
    })
  }

  abrirModal(cliente: Cliente) 
  {
    this.clienteSeleccionado = cliente;
    this.modalService.abrirModal();
  }
}
