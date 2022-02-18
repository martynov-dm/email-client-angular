import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  signedin$: BehaviorSubject<boolean> = this.authService.signedin$

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.authService.checkAuth().subscribe(() => {})
  }
}
