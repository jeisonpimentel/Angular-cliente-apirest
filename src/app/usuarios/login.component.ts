import { Component, OnInit } from '@angular/core';
import { Usuario } from './usuario';
import swal from 'sweetalert2';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  titulo : string = 'Por favor Sign In';
  usuario : Usuario; 

  constructor(private authService: AuthService,
    private router : Router) {
    this.usuario = new Usuario
   }

  ngOnInit(): void {
    if(this.authService.isAuthenticated){
      swal.fire('Login', `Hola ${this.authService.usuario.username} ya estás autenticado.`, 'info');
      this.router.navigate(['/clientes']);
    }
  }

  login() : void {
    console.log(this.usuario);
    if(this.usuario.username.length == 0 || this.usuario.password.length == 0) {
      swal.fire('Error en el Login', '¡Username o Password vacías!', 'error');
      return;
    }

    this.authService.login(this.usuario).subscribe(response => {
      console.log(response);

      this.authService.guardarUsuario(response.access_token);
      this.authService.guardarToken(response.access_token);

      let usuario = this.authService.usuario;

      this.router.navigate(['/clientes']);
      swal.fire('Login', `Hola ${usuario.email}, has iniciado sessión con exito`, 'success');
    },
    err => {
      if(err.status == 400){
        swal.fire('Error en el Login', 'Usuario o Contraseña son incorrectas', 'error');
      }
    });
  }

}
