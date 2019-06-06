import { HttpInterceptor } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { tap } from "rxjs/operators";
import { Router } from "@angular/router";
@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    /**
     *
     */
    constructor(private router:Router) {
    }
    intercept(req: import("@angular/common/http").HttpRequest<any>, next: import("@angular/common/http").HttpHandler): import("rxjs").Observable<import("@angular/common/http").HttpEvent<any>> {
        if(localStorage.getItem('token')){
            const clonedReq = req.clone({
                headers:req.headers.set('Authorization','Bearer '+localStorage.getItem('token'))
            });
            return next.handle(clonedReq).pipe(
                tap(
                    succ => {},
                    err => {
                        if(err.status == 401){
                            this.router.navigateByUrl('/user/login');
                            localStorage.clear();
                        } 
                    }
                )
            )
        }
        else
            return next.handle(req.clone());
    }

}