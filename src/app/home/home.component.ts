import { Component, VERSION, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import liff from '@line/liff';
import { HttpClient } from '@angular/common/http';
import { RouteConfigLoadStart, Router } from '@angular/router';
import { Routes, RouterModule } from '@angular/router';

type UnPromise<T> = T extends Promise<infer X> ? X : T;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  result: String;
  result2: String;
  os: ReturnType<typeof liff.getOS>;
  profile: UnPromise<ReturnType<typeof liff.getProfile>>;
  onClick(event?: MouseEvent) {
    if (event) {
      event.stopPropagation();
    }
    liff
      .init({ liffId: '1657421042-ekawW2jw' })
      .then(() => {
        this.os = liff.getOS();
        if (liff.isLoggedIn()) {
          liff
            .getProfile()
            .then((profile) => {
              this.profile = profile;
            })
            .catch(console.error);
        } else {
          liff.login();
        }
      })
      .catch(console.error);
  }

  constructor(private http: HttpClient) {}

  onTest(event?: MouseEvent) {
    console.log(
      JSON.stringify({
        param: {
          ContextKey: 'ReU',
          LineUserID: 'Ue9d21deca4c514a40bfdd965f6996e22',
        },
      })
    );
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
        console.log(data.LineRegistered);
        this.result = data.LineRegistered;
      });
  }

  onTest2(event?: MouseEvent) {
    console.log(
      JSON.stringify({
        param: {
          ContextKey: 'ReU',
          LineUserID: 'Ue9d21deca4c514a40bfdd965f6996e22',
        },
      })
    );
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
        console.log(data.LineRegistered);
        this.result2 = 'true';
      });
    if (this.result2) {
      this.router.navigate(['appointment']);
    }
  }
}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
