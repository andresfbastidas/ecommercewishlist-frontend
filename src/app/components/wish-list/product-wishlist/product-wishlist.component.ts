import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { WishList } from 'src/app/core/models/wish-list';
import { WishListRequest } from 'src/app/core/models/wish-list-request';
import { ShareDataService } from 'src/app/core/services/share-data.service';
import { SharedService } from 'src/app/core/services/shared.service';
import { WishListService } from 'src/app/core/services/wish-list.service';
import { DialogComponent } from '../../notification/dialog.component';

@Component({
  selector: 'app-product-wishlist',
  templateUrl: './product-wishlist.component.html'
})
export class ProductWishlistComponent implements OnInit {

  productWishList =[] as WishList[];
  selectedAll!:boolean;
  checkedList: any = 0;
  idProduct!: number;
  wishListRequest!: WishListRequest;
  dataUsername!:Array<string>;
  username!:string;

  constructor(private wishListService:WishListService, private readonly dialog: DialogComponent,
    private shareDataService:ShareDataService, private readonly sharedService:SharedService) { }

  ngOnInit(): void {
    this.getProductWishList();
    this.shareDataService.castUser.subscribe(
      user => (this.dataUsername=user)
    );
    this.username=this.dataUsername[0];
  }

  getProductWishList(){
     this.wishListService.productWishList().subscribe({
      next: (response: any) =>  {
        this.productWishList = response.wishlists;
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

  toggleAll(f:NgForm):void{
    Object.keys(f.controls).forEach(element => {
      if(element!=='chk-all'){
        f.controls[element].setValue(this.selectedAll);
      }
    });
  }//toggleAll

  checkIfAllSelected(f:NgForm):void {
    this.selectedAll = Object.keys(f.controls).every(element => {
        return (element!=='chk-all')?f.controls[element].value === true:true;
    });
    this.getCheckedItemList();
  }//checkIfAllSelected

  getCheckedItemList() {
    this.checkedList = [];
    for (var i = 0; i < this.productWishList.length; i++) {
      if (this.productWishList[i].product.isSelected) {
        this.checkedList.push(this.productWishList[i]);
        this.idProduct =this.productWishList[i].product.idProduct;
      }
    }
  }

  deleteProductWishList(){
    this.getProductWishList();
    this.username=this.dataUsername[0];
    console.log(this.username);
    this.wishListRequest = new WishListRequest(this.idProduct, this.username);
    this.wishListService.deleteProductWishList(this.wishListRequest).subscribe({
      next: (response: any) =>  {
        this.sharedService.msgInfo('Producto aeliminado de la lista de deseos');
        this.getProductWishList();
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
