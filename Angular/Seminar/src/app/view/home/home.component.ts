import { Component, OnDestroy, OnInit } from '@angular/core';
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
  seminars = [];
  seminar: SeminarDetails[];

  constructor(private _activatedroute: ActivatedRoute, private _router: Router,
    private dialog: MatDialog, private connectBackendService: ConnectBackendService) { }

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
    this.connectBackendService.coordinatoData.subscribe(() => this.getAllSeminar());
  }

  getAllSeminar() {
    this.connectBackendService.getAllSeminar().subscribe(data => {
      for (var field in data) {
        this.seminars.push(data[field]);
      }
    });
  }

  showDetails(ID) {
    this.seminar = this.seminars.filter(seminar => seminar.seminarID === ID);
    this.dialog.open(DisplaySeminarComponent, { data: this.seminar })
  }
}
