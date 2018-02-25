import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AlertModule } from 'ngx-bootstrap';
import { CryptoDataService } from './shared/services/crypto-data.service';
import { NvD3Module } from 'ng2-nvd3';


import { D3Component } from './components/d3/d3.component';

@NgModule({
  declarations: [
    AppComponent,
    D3Component,
  ],
  imports: [
    BrowserModule,
      HttpClientModule,
      ReactiveFormsModule,
      AlertModule.forRoot(),
      NvD3Module
  ],
  providers: [CryptoDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
