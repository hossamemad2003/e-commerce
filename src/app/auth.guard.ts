import { CanActivateFn, Router } from '@angular/router';

export function authGuard(route: Router) {
  if (localStorage.getItem('userToken') !== null) {
    return true;
  } else {
    route.navigate(['/login']);
    return false;
  }
}
