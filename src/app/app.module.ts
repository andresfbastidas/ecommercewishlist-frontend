import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MenuModule} from 'primeng/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductListComponent } from './components/product/product-list/product-list.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ResponseHttp } from './core/interceptors/response-http.interceptor';
import { DialogModule } from './components/notification/dialog.module';
import { DialogComponent } from './components/notification/dialog.component';
import { MenuBarComponent } from './components/menubar/menu-bar-component';
import { ProductWishlistComponent } from './components/wish-list/product-wishlist/product-wishlist.component';
import { AddWishlistComponent } from './components/wish-list/add-wishlist/add-wishlist.component';
import { DeleteWishlistComponent } from './components/wish-list/delete-wishlist/delete-wishlist.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    ProductListComponent,
    MenuBarComponent,
    ProductWishlistComponent,
    AddWishlistComponent,
    DeleteWishlistComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MenuModule,
    HttpClientModule,
    DialogModule
  ],
  providers: [DialogComponent,{ provide: HTTP_INTERCEPTORS, useClass: ResponseHttp, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
