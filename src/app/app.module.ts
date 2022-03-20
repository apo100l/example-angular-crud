import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemProductsService } from './services/inMemProductService.service';
import { ApiInterceptor } from './interceptors/api.interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemProductsService, { delay: 1500 }),
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true }],
  bootstrap: [AppComponent],
})
export class AppModule {}
