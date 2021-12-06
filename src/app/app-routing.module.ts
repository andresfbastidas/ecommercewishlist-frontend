import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ProductListComponent } from './components/product/product-list/product-list.component';
import { ProductWishlistComponent } from './components/wish-list/product-wishlist/product-wishlist.component';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo:'login',pathMatch:'full'},
  { path: 'login', component: LoginComponent },
  { path: 'product-list',data: {title: 'Listado de productos'}, component: ProductListComponent, canActivate: [AuthGuard] },
  { path: 'wish-list', component: ProductWishlistComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
