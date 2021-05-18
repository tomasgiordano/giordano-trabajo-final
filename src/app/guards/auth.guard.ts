import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor (private auth:AuthService, private toast:ToastrService,private route:Router)
  {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      let user;
      return this.auth.getUserUid().then(res => {
        user = res;
        
        if(user != 0 && user!=undefined)
        { 
          console.info(user);
          return true;
        }
        else
        {  
          this.toast.error("Necesitás estar logueado para ingresar a esta ruta","Error");
          // alert("Necesitás estar logueado para ingresar a esta ruta")
          this.route.navigate(['/Login']);
          return false;
        }
    }).catch(res =>{
      this.toast.error(res,"Error");
     // alert(res);
      this.route.navigate(['/Login']);
      return false;
    })
  }
  
}