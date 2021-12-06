import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/core/models/product';
import { WishListRequest } from 'src/app/core/models/wish-list-request';
import { ProductService } from 'src/app/core/services/product.service';
import { WishListService } from 'src/app/core/services/wish-list.service';
import { DialogComponent } from '../../notification/dialog.component';
import { NgForm } from '@angular/forms';
import { ShareDataService } from 'src/app/core/services/share-data.service';
import { SharedService } from 'src/app/core/services/shared.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html'
})
export class ProductListComponent implements OnInit {

  productList =[] as Product[];
  selectedAll!:boolean;
  addWishListRequest!: WishListRequest;
  idProduct!: number;
  username!:string;
  checkedList: any = 0;
  dataUsername!:Array<string>;
  constructor(private productService:ProductService, private readonly dialog: DialogComponent, 
    private wishListService:WishListService, private shareDataService:ShareDataService, private readonly sharedService:SharedService) { }

  ngOnInit(): void {
    this.getProductList();
    this.shareDataService.castUser.subscribe(
      user => (this.dataUsername=user)
    );
    this.username=this.dataUsername[0];
  }

  getCheckedItemList() {
    this.checkedList = [];
    for (var i = 0; i < this.productList.length; i++) {
      if (this.productList[i].isSelected) {
        this.checkedList.push(this.productList[i]);
        this.idProduct =this.productList[i].idProduct;
      }
    }
  }

  checkIfAllSelected(f:NgForm):void {
    this.selectedAll = Object.keys(f.controls).every(element => {
        return (element!=='chk-all')?f.controls[element].value === true:true;
    });
    this.getCheckedItemList();
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
    this.username=this.dataUsername[0];
    this.addWishListRequest = new WishListRequest(this.idProduct, this.username);
    this.wishListService.addProduct(this.addWishListRequest).subscribe({
      next: (response: any) =>  {
        this.sharedService.msgInfo('Producto añadido a la lista de deseos');
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
