import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatchPassword} from "../validators/match-password";
import {HttpClient} from "@angular/common/http";
import {UniqueUsername} from "../validators/unique-username";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  authForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.maxLength(20),
      Validators.minLength(3),
      Validators.pattern(/^[a-z0-9]+$/),
    ], [this.uniqueUsername.validate]),
    password: new FormControl('', [
      Validators.required,
      Validators.maxLength(20),
      Validators.minLength(4),
    ]),
    passwordConfirmation: new FormControl('', [
      Validators.required,
      Validators.maxLength(20),
      Validators.minLength(4),
    ]),
  }, { validators: [ this.matchPassword.validate ] })

  constructor(private matchPassword: MatchPassword,
              private uniqueUsername: UniqueUsername,
              private authService: AuthService,
              private router: Router,
  ) {}

  ngOnInit(): void {}

  onSubmit() {
     if (this.authForm.invalid) return

     this.authService.signup(this.authForm.value).subscribe({
       next: () => {
         this.router.navigateByUrl('/inbox')
       },
       error: (err) => {
          if (!err.status) {
            this.authForm.setErrors({ noConnection: true })
          } else {
            this.authForm.setErrors({ unknownError: true })
          }
       },
     })
  }
}
