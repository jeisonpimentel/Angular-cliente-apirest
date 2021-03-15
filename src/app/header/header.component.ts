import { Component, OnInit} from '@angular/core';
import { AuthService } from '../usuarios/auth.service';
import {Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  constructor(public authService : AuthService, private router: Router ) { }

  ngOnInit(): void {
  }

  logout() : void {
    swal.fire('Logout', `Hola ${this.authService.usuario.username} has cerrado sesión con exito!`, 'success');
    this.authService.logout();
    this.router.navigate(['/clientes']);
  }

}
