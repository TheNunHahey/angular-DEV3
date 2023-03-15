import { Component, VERSION, OnInit } from '@angular/core';
import { products } from '../products';
import { Observable } from 'rxjs';
import liff from '@line/liff';

type UnPromise<T> = T extends Promise<infer X> ? X : T;

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent {
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
}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
