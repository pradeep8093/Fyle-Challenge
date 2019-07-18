import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpHeaders, HttpResponse } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CacheMapService } from './cache-map.service';

@Injectable()
export class CachingInterceptor implements HttpInterceptor {
  constructor(private cache: CacheMapService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // continue if not cachable.
    console.log("hi")
    if (!this.isRequestCachable(req)) { return next.handle(req); }

    const cachedResponse = this.cache.get(req);
    
    return cachedResponse ? of(cachedResponse) : this.handleRequest(req, next);   

    }
    private isRequestCachable(req: HttpRequest<any>) {
        return (req.method === 'GET');
    }

    private handleRequest(
        request: HttpRequest<any>,
        next: HttpHandler
      ):Observable<HttpEvent<any>> {
        return next.handle(request).pipe(tap(event => {
            console.log(event)
          if (event instanceof Response) {
            /* this.cache.put(request, event); */
            caches.open("new").then(cache => {
              cache.put(request.urlWithParams,event);
            })
          }
        }));
      }
  }


  /**
 * Get server response observable by sending request to `next()`.
 * Will add the response to the cache on the way out.
 */

  
