import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ConnectBackendService } from 'src/app/controller/connect-backend.service';
import { PopupComponent } from 'src/app/view/InfoPopUp/popup/popup.component';
import { SeminarDetails } from 'src/app/model/seminar-details';
import { HomeCoordinatorComponent } from '../../view/co-ordinator/module/home-coordinator/home-coordinator.component';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  editForm: FormGroup;
  data;
  editData: SeminarDetails;
  minDate: Date;
  maxDate: Date;
  // public dialogRef: MatDialogRef<HomeCoordinatorComponent>,@Inject(MAT_DIALOG_DATA) public data, 

  constructor(private connectBackendService: ConnectBackendService, public dialog: MatDialog, private _router: Router, private route: ActivatedRoute) {
    const currentDate = new Date();
    this.editForm = new FormGroup({
      title: new FormControl(""),
      speaker: new FormControl(""),
      abstract: new FormControl(""),
      startDate: new FormControl(),
      endDate: new FormControl(),
      venue: new FormControl("")
    })
    this.minDate = currentDate;
    this.maxDate = this.minDate;
  }

  setMaxDate(event: MatDatepickerInputEvent<Date>) {
    this.maxDate = event.value;
  }

  ngOnInit(): void {
    this.data = JSON.parse(this.route.snapshot.paramMap.get('data'));
  }

  onEdit() {
    console.log(this.editData);
    this.editData = {
      seminarID: this.data[0].seminarID,
      speakerName: this.editForm.controls.speaker.value || this.data[0].speaker,
      venue: this.editForm.controls.venue.value || this.data[0].venue,
      startDate: this.editForm.controls.startDate.value || new Date(this.data[0].seminarStartingDate),
      endDate: this.editForm.controls.endDate.value || new Date(this.data[0].seminarEndDate)
    };
    console.log(this.editData);
    this.connectBackendService.editSeminar(this.editData).subscribe((data) => {
      if (data) {
        this._router.navigate(['/coordinator/coor-home'])
        var message = "Edit Successful";
        this.dialog.open(PopupComponent, { data: message });
      }
    });
  }

  cancel() {
    this._router.navigate(['/coordinator/coor-home']);
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.editForm.controls[controlName].hasError(errorName);
  };

}
