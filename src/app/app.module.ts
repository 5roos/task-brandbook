import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';
import { CrudComponent } from './modules/crud/crud.component';
import { HomePageComponent } from './core/home-page/home-page.component';
import { CircularMenuComponent } from './layout/circular-menu/circular-menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CrudComponent,
    HomePageComponent,
    CircularMenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule // for angular animations
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
