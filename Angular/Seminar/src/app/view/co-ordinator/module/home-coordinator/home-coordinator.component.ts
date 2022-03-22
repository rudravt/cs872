import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ConnectBackendService } from 'src/app/controller/connect-backend.service';
import { PopupComponent } from 'src/app/view/InfoPopUp/popup/popup.component';
import { SeminarDetails } from 'src/app/model/seminar-details';
import { DisplayComponent } from '../display/display.component';
import { EditComponent } from '../../../../UIComponent/edit/edit.component';

@Component({
  selector: 'app-home-coordinator',
  templateUrl: './home-coordinator.component.html',
  styleUrls: ['./home-coordinator.component.css']
})
export class HomeCoordinatorComponent implements OnInit {
  seminars: SeminarDetails[];
  message: SeminarDetails[];
  seminar: SeminarDetails[];

  constructor(private dialog: MatDialog, private connectBackendService: ConnectBackendService, private router: Router) {
  }

  ondisplay(ID): void {
    this.message = this.seminars.filter(seminar => seminar.seminarID === ID);
    this.dialog.open(DisplayComponent, { data: this.message })
  }

  ngOnInit() {
    this.connectBackendService.coordinatoData.subscribe(() => {
      this.getData();
    });
  }

  getData() {
    this.seminars = [];
    this.connectBackendService.getConductedSeminar().subscribe(data => {
      for (var field in data) {
        this.seminars.push(data[field]);
      }
    });
  }

  onEdit(ID): void {
    this.seminar = this.seminars.filter(seminar => seminar.seminarID === ID);
    this.router.navigate(['/coordinator/edit', { data: JSON.stringify(this.seminar) }]);
  }

  onDelete(ID): void {
    this.connectBackendService.deleteSeminar(ID).subscribe(data => {
      if (data) {
        this.connectBackendService.coordinatoData.subscribe(() => {
          this.getData();
        });
        var message = "Edit Successful";
        this.dialog.open(PopupComponent, { data: message });
      }
    });
  }

}
