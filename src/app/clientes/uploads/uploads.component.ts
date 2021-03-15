import { Component, OnInit, Input } from '@angular/core';
import { Cliente } from '../cliente';
import { ClienteService } from '../cliente.service';
import swal from 'sweetalert2';
import { HttpEventType } from '@angular/common/http';
import { ModalService } from './modal.service'; 

@Component({
  selector: 'app-uploads',
  templateUrl: './uploads.component.html',
  styleUrls: ['./uploads.component.css']
})
export class UploadsComponent implements OnInit {

  @Input() public cliente : Cliente;
  public titulo : string = 'Detalle de cliente';
  private fotoSeleccionada : File;
  public progreso : number;

  constructor(
    private clienteService : ClienteService,
    public modalService : ModalService
    ) { }

  ngOnInit(): void {
  }

  seleccionarFoto(event) {
    this.fotoSeleccionada = event.target.files[0];
    this.progreso = 0;
    console.log(this.fotoSeleccionada);
    if(this.fotoSeleccionada.type.indexOf('image') < 0)
    {
      swal.fire('Error debe seleccionar una imagen', 'El formato del archivo debe ser de tipo imagen', 'error');
      this.fotoSeleccionada = null;
    }
  }

  subirFoto() {

    if(!this.fotoSeleccionada){
      swal.fire('Error upload', 'Debe seleccionar una foto', 'error');
    } else {
      this.clienteService.subirFoto(this.fotoSeleccionada, this.cliente.id)
      .subscribe( event => {
        if(event.type === HttpEventType.UploadProgress){
          this.progreso = Math.round((event.loaded / event.total) * 100);
        } else if(event.type === HttpEventType.Response) {
          let response : any = event.body;
          this.cliente = response.cliente as Cliente
          this.modalService.notificarUpload.emit(this.cliente);
          swal.fire('La foto se ha sido cargada', response.mensaje, 'success');
        } 
      });
    }    
  }

  cerrarModal() {
    this.modalService.cerrarModal();
    this.progreso = 0;
    this.fotoSeleccionada = null;
  }

}
