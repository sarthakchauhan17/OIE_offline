import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { EmployeeComponent } from './component/employee.component';
import { EmployeeService } from './service/service';
import { HttpClientModule } from '@angular/common/http';
import { PaginationComponent } from './component/pagination.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from './../environments/environment.prod';
import { AsyncCache, LocalStorageDriver, MemoryDriver, AsyncCacheModule, AsyncCacheOptions, CachedHttp } from 'angular-async-cache';
import { asyncCacheOptionsFactory } from './http-interceptors/caching-interceptor';
import { AsyncLocalStorageModule } from 'angular-async-local-storage';

@NgModule({
  declarations: [
    EmployeeComponent,
    PaginationComponent
  ],
  imports: [
  BrowserModule, HttpModule, HttpClientModule, AppRoutingModule, ReactiveFormsModule,
    ServiceWorkerModule.register('/ngsw-worker.js', {enabled: environment.production }),
    AsyncCacheModule.forRoot({
      provide: AsyncCacheOptions,
      useFactory: asyncCacheOptionsFactory
    }),
    AsyncLocalStorageModule
  ],
  providers: [
EmployeeService, PaginationComponent, FormBuilder
/* ,{
  provide: HTTP_INTERCEPTORS,
  useClass: CachingInterceptor,
  multi: true
} */],
  bootstrap: [EmployeeComponent]
})
export class AppModule { }
