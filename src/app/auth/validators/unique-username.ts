import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {AbstractControl, AsyncValidator, ValidationErrors} from "@angular/forms";
import {catchError, map, of} from "rxjs";
import {AuthService} from "../auth.service";

@Injectable({
  providedIn: 'root'
})
export class UniqueUsername implements AsyncValidator {
  constructor(private authService: AuthService) {}

  validate = (control: AbstractControl) => {
    const { value } = control

    return this.authService.usernameAvailable(value).pipe(
      map((value) => {
        if (value.available) {
          return null
        }
        return value
      }),
      catchError((err) => {
        console.log(err)
        if (err.error.username) {
          return of({ nonUniqueUsername: true })
        }
        return of({ noConnection: true })
      })
    )
  }
}
