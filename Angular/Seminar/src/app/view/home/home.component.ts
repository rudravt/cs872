import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { StudloginComponent } from '../student/module/studlogin/studlogin.component';
import { CoordinatorloginComponent } from '../../UIComponent/coordinatorlogin/coordinatorlogin.component';
import { RegisterComponent } from '../../UIComponent/register/register.component';
import { ConnectBackendService } from '../../controller/connect-backend.service';
import { SeminarDetails } from '../../model/seminar-details';
import { DisplaySeminarComponent } from '../display-seminar/display-seminar.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  seminars: SeminarDetails[];
  seminar: SeminarDetails[];

  @HostListener('window:focus') onFocus() {
    console.log('window focus');

    window.location.reload();
  }

  constructor(private _activatedroute: ActivatedRoute, private _router: Router,
    private dialog: MatDialog, private connectBackendService: ConnectBackendService) {
    this.getAllSeminar();
  }

  onstudclick() {
    this.dialog.open(StudloginComponent, { width: '40%', height: '50%' });
  }
  oncoordinatorclick() {
    this.dialog.open(CoordinatorloginComponent);
  }
  onregister(): void {
    this.dialog.open(RegisterComponent)
  }
  ngOnInit(): void {
    this.connectBackendService.allSeminar.subscribe(data => {
      this.seminars = []
      for (var field in data) {
        this.seminars.push(data[field]);
      }
    })
  }

  getAllSeminar() {
    this.connectBackendService.getAllSeminar().subscribe(data => {
      this.connectBackendService.allSeminars$.next(data);
    });
  }

  showDetails(ID) {
    this.seminar = this.seminars.filter(seminar => seminar.seminarID === ID);
    this.dialog.open(DisplaySeminarComponent, { data: this.seminar })
  }
}
