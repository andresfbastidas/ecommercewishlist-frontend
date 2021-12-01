import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';
@Component({
  selector: 'app-menubar',
  templateUrl: './menu-bar-component.html'
})
export class MenuBarComponent implements OnInit {

  items!: MenuItem[];
  constructor() { }

  ngOnInit(): void {
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
