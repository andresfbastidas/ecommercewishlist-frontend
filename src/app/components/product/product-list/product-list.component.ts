import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/core/models/product';
import { WishListRequest } from 'src/app/core/models/wish-list-request';
import { ProductService } from 'src/app/core/services/product.service';
import { WishListService } from 'src/app/core/services/wish-list.service';
import { DialogComponent } from '../../notification/dialog.component';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html'
})
export class ProductListComponent implements OnInit {

  productList =[] as Product[];
  selectedAll!:boolean;
  wishListRequest!: WishListRequest;
  idProduct!: number;
  username!:string;
  constructor(private productService:ProductService, private readonly dialog: DialogComponent, private wishListService:WishListService) { }

  ngOnInit(): void {
    this.getProductList();
    this.productList
    
  }

  checkIfAllSelected(f:NgForm):void {
    this.selectedAll = Object.keys(f.controls).every(element => {
        return (element!=='chk-all')?f.controls[element].value === true:true;
    });
  }//checkIfAllSelected
  toggleAll(f:NgForm):void{
    Object.keys(f.controls).forEach(element => {
      if(element!=='chk-all'){
        f.controls[element].setValue(this.selectedAll);
      }
    });
  }//toggleAll
  getProductList(){
    this.productService.productList().subscribe({
      next: (response: any) =>  {
        this.productList = response.productList;
        console.log(this.productList);
        this.productList.values();
        this.productList[0].idProduct;
      },
      error: (err) => {
        this.dialog.show({
          title: "Error",
          content: this.dialog.formatError(err),
          type: "error", footer: new Date().toLocaleString(), textTech: `${this.dialog.formatError(err)}`
        });
      }
    }, 
    );
  }

  addProductWishList(){
    this.wishListRequest = new WishListRequest(this.idProduct, this.username);
    this.wishListService.addProduct(this.wishListRequest).subscribe({
      next: (response: any) =>  {
        
      },
      error: (err) => {
        this.dialog.show({
          title: "Error",
          content: this.dialog.formatError(err),
          type: "error", footer: new Date().toLocaleString(), textTech: `${this.dialog.formatError(err)}`
        });
      }
    });
}

}
