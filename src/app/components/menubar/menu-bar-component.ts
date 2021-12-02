import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-menubar',
  templateUrl: './menu-bar-component.html'
})
export class MenuBarComponent implements OnInit {

  items!: MenuItem[];
  isLoggedIn = false;

  constructor(public readonly authService:AuthService) { }

  ngOnInit(): void {
    const user = this.authService.getUser();
    if(user!=null){
      this.isLoggedIn=true;
    }
    
    this.items = [
      {
        label: 'Productos',
        items: [
            {
              label: 'Listado de productos', 
              icon: 'pi pi-fw pi-file',
              routerLink: ['product-list']
            },
            {
              label: 'Lista de deseos', 
              icon: 'pi pi-fw pi-file',
              routerLink: ['wish-list']
            }
        ]
      }
    ];
  }

}
