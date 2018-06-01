import { AsyncCache, LocalStorageDriver, MemoryDriver, AsyncCacheModule, AsyncCacheOptions, CachedHttp } from 'angular-async-cache';
 

export function asyncCacheOptionsFactory(): AsyncCacheOptions {
  return new AsyncCacheOptions({
 
    // Default cache driver to use. Default in memory. 
    // You can also roll your own by implementing the CacheDriver interface
    driver: new LocalStorageDriver(),
 
    // this is the special sauce - first emit the data from localstorage, 
    // then re-fetch the live data from the API and emit a second time. 
    // The async pipe will then re-render and update the UI. Default: false
    fromCacheAndReplay: true
 
  });
}




















//Code for Cahing Requests
/* import { HttpRequest, HttpHandler,HttpEvent,HttpInterceptor,HttpHeaders,HttpResponse} from '@angular/common/http';
import { RequestCache,isCacheable} from 'angular-cache';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

@Injectable()
export class CachingInterceptor implements HttpInterceptor {
  constructor(private req: HttpRequest<any>,private next: HttpHandler,private cache:RequestCache) {}
  //cache: RequestCache;
  intercept(req: HttpRequest<any>, next: HttpHandler) {
     alert("intercept I am");
     // continue if not cachable.
    //if (!isCacheable(req)) { alert("isCacheable I am"); return next.handle(req); }

    const cachedResponse = this.cache.get(req);
    return cachedResponse ? of(cachedResponse) : sendRequest(req, next, this.cache); 
  }
}

 function sendRequest(
    req: HttpRequest<any>,
    next: HttpHandler,
    cache: RequestCache): Observable<HttpEvent<any>> {
        alert("send Request I am");
    // No headers allowed in npm search request
    const noHeaderReq = req.clone({ setHeaders: {'Custom-Header-1': '1'} });
  
    return next.handle(noHeaderReq).pipe(
      tap(event => {
        // There may be other events besides the response.
        if (event instanceof HttpResponse) {
          cache.put(req, event); // Update the cache.
        }
      })
    );
  }  */