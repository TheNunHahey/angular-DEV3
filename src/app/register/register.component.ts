import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  userprofileForm = new FormGroup({
    pid: new FormControl(''),
    tel: new FormControl(''),
  });

  onTest(event?: MouseEvent) {
    this.router.navigate(['home']);
  }
  onSubmit(event?: MouseEvent) {
    console.log(this.userprofileForm.value);
  }
}
