import { Component, VERSION, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import liff from '@line/liff';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

type UnPromise<T> = T extends Promise<infer X> ? X : T;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  result: Boolean;
  result2: Boolean;

  //.init({ liffId: '1657421042-ekawW2jw' })
  os: ReturnType<typeof liff.getOS>;
  profile: UnPromise<ReturnType<typeof liff.getProfile>>;
  ngOnInit(): void {
    liff
      .init({ liffId: '1657421042-ekawW2jw' })
      .then(() => {
        this.os = liff.getOS();
        if (liff.isLoggedIn()) {
          liff
            .getProfile()
            .then((profile) => {
              this.profile = profile;
              console.log(this.profile.userId);
              let url =
                'https://dev-logic.net/dxapi/ProductRESTService.svc/MobileEnquireLineRegister';
              this.http
                .post(url, {
                  param: {
                    ContextKey: 'ReU',
                    LineUserID: this.profile.userId,
                  },
                })
                .toPromise()
                .then((data: any) => {
                  console.log(data);
                  //console.log(data.LineRegistered);
                  this.result = data.LineRegistered;
                  if (data.HN) {
                    this.router.navigate(['appointment'], {
                      queryParams: {
                        HN: data.HN,
                      },
                    });
                  }
                  if (this.result) {
                    //alert('TEST');
                  } else {
                    //alert('TEST');
                    //this.router.navigate(['appointment']);
                    this.router.navigate(['register']);
                  }
                });
            })
            .catch(console.error);
        } else {
          liff.login();
        }
      })
      .catch(console.error);
  }

  constructor(private http: HttpClient, private router: Router) {}

  onTest(event?: MouseEvent) {
    let url =
      'https://dev-logic.net/dxapi/ProductRESTService.svc/MobileEnquireLineRegister';
    this.http
      .post(url, {
        param: {
          ContextKey: 'ReU',
          LineUserID: 'Ue9d21deca4c514a40bfdd965f6996e22',
        },
      })
      .toPromise()
      .then((data: any) => {
        console.log(data);
        //console.log(data.LineRegistered);
        this.result = data.LineRegistered;
      });
    if (this.result) {
      //this.router.navigate(['appointment']);
      //alert('TEST');
    } else {
      //alert('TEST');
      this.router.navigate(['appointment']);
    }
  }

  onTest3(event?: MouseEvent) {
    this.result2 = true;
    this.router.navigate(['register']);
  }
}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
