import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BankDetailsComponent } from './bank-details/bank-details.component';
import { FormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';
import { NgxUiLoaderModule } from  'ngx-ui-loader';

import { HttpClientService } from './GenericService/Http.service';
import { HttpClient, HttpClientModule, HttpHandler, HTTP_INTERCEPTORS } from '@angular/common/http';

import { Cache } from './GenericService/cache';
import { CacheMapService } from './GenericService/cache-map.service';
import { CachingInterceptor } from './GenericService/caching.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BankDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
    NgxUiLoaderModule
  ],
  providers: [
    HttpClientService,
    HttpClient,
    HttpClientModule,
    CacheMapService,
    { provide: Cache, useClass: CacheMapService },
    { provide: HTTP_INTERCEPTORS, useClass: CachingInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
