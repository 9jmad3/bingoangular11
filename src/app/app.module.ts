import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CartonComponent } from './carton/carton.component';
import { NavComponent } from './nav/nav.component';
import { NumerosComponent } from './numeros/numeros.component';
import { FooterComponent } from './footer/footer.component';
import { BannerderechoComponent } from './bannerderecho/bannerderecho.component';

@NgModule({
  declarations: [
    AppComponent,
    CartonComponent,
    NavComponent,
    NumerosComponent,
    FooterComponent,
    BannerderechoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
