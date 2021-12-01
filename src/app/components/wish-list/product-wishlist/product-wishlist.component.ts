import { Component, OnInit } from '@angular/core';
import { WishList } from 'src/app/core/models/wish-list';
import { WishListService } from 'src/app/core/services/wish-list.service';
import { DialogComponent } from '../../notification/dialog.component';

@Component({
  selector: 'app-product-wishlist',
  templateUrl: './product-wishlist.component.html'
})
export class ProductWishlistComponent implements OnInit {

  productWishList =[] as WishList[];

  constructor(private wishListService:WishListService, private readonly dialog: DialogComponent) { }

  ngOnInit(): void {
    this.getProductWishList();
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

}
