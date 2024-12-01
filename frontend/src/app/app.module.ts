import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, FooterComponent, ProductListComponent, ShoppingCartComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, CommonModule, FormsModule, DropdownModule, TableModule, ButtonModule, PanelModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
