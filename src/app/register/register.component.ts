import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {}

  hn: String;
  userprofileForm = new FormGroup({
    pid: new FormControl(''),
    tel: new FormControl(''),
  });

  onTest(event?: MouseEvent) {
    this.router.navigate(['home']);
  }
  onSubmit(event?: MouseEvent) {
    console.log(this.userprofileForm.value);
    let url =
      'https://dev-logic.net/dxapi/ProductRESTService.svc/MobileUpdateLineRegister';
    this.http
      .post(url, {
        param: {
          ContextKey: 'ReU',
          LineUserID: 'U738fee403ae3832c42ae5d4c1ae04f9e',
          IDCard: this.userprofileForm.controls['pid'].value,
          TelephoneNo: this.userprofileForm.controls['tel'].value,
        },
      })
      .toPromise()
      .then((data: any) => {
        console.log(data);
        this.hn = data.HN;
        if (this.hn != '') {
          this.router.navigate(['appointment']);
          //alert('TEST');
        } else {
          this.router.navigate(['notfound']);
        }
      });
  }
}
