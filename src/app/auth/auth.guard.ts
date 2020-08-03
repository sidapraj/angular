import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router:Router,private auth:AuthService){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
        // return this.auth.user.pipe(map(user => {
        //   return !!user

        // }),tap(isAuth => {
        //   if(!isAuth){
        //  this.router.navigate(['auth'])
        //   }
        // }));
        return this.auth.user.pipe(take(1),map(user => {
         const isAuth= !!user
         if(isAuth) {
           return true;
         } else {
           this.router.navigate(['/auth'])
         }

        }))
  }
  
}
