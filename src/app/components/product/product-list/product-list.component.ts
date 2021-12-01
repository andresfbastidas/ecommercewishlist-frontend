import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/core/services/product';
import { ProductService } from 'src/app/core/services/product.service';
import { DialogComponent } from '../../notification/dialog.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html'
})
export class ProductListComponent implements OnInit {

  productList =[] as Product[];
  constructor(private productService:ProductService, private readonly dialog: DialogComponent) { }

  ngOnInit(): void {
    this.getProductList();
  }

  getProductList(){
    this.productService.productList().subscribe((response: any) => {
      this.productList = response.productList;
    }, error => {
      this.dialog.show({
        title: "Error",
        content: this.dialog.formatError(error),
        type: "error", footer: new Date().toLocaleString(), textTech: `${this.dialog.formatError(error)}`
      });
    }
    );
  }

}
