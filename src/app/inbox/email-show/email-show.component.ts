import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {EmailService} from "../email.service";
import {switchMap} from "rxjs";
import {Email} from "../email";

@Component({
  selector: 'app-email-show',
  templateUrl: './email-show.component.html',
  styleUrls: ['./email-show.component.css']
})
export class EmailShowComponent implements OnInit {
  email!: Email

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.data.subscribe(({ email }) => {
      this.email = email
    })
  }
}
