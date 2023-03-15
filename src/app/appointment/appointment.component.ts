import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DataTablesModule } from 'angular-datatables';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css'],
})
export class AppointmentComponent implements OnInit {
  data: any;
  constructor(private http: HttpClient, private router: Router) {
    let url =
      'https://dev-logic.net/dxapi/ProductRESTService.svc/EnquirePatientAppointment';

    this.http
      .post(url, {
        param: {
          EnglishView: false,
          HN: '2200907',
          AppointDateTimeFrom: '2023-01-13T00:00:00.000',
          AppointDateTimeTo: '2023-03-01T00:00:00:000',
          ContextKey: 'ReU',
        },
      })
      .subscribe(
        (data) => {
          this.data = data;
          setTimeout(() => {
            $('#datatableexample').DataTable({
              pagingType: 'full_numbers',
              pageLength: 5,
              processing: true,
              lengthMenu: [5, 10, 25],
            });
          }, 1);
        },
        (error) => console.error(error)
      );
  }

  ngOnInit() {}

  onTest2(event?: MouseEvent) {
    this.router.navigate(['home']);
  }
}
