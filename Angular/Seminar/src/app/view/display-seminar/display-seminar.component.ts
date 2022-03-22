import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HomeComponent } from '../home/home.component';
import { SeminarDetails } from '../../model/seminar-details';
import { RegisterStudentComponent } from '../student/module/register-student/register-student.component';

@Component({
  selector: 'app-display-seminar',
  templateUrl: './display-seminar.component.html',
  styleUrls: ['./display-seminar.component.css']
})
export class DisplaySeminarComponent implements OnInit {
  startDate: Date;
  endDate: Date;
  seminar: SeminarDetails;

  constructor(public dialogRef: MatDialogRef<HomeComponent>,
    @Inject(MAT_DIALOG_DATA) public data, private dialog: MatDialog) {
    this.startDate = new Date(data[0].seminarStartingDate);
    this.endDate = new Date(data[0].seminarEndDate);
  }

  ngOnInit(): void {
  }

  registerForSeminar() {
    this.seminar = {
      title: this.data[0].seminarTitle,
      seminarID: this.data[0].seminarID
    }
    this.dialog.open(RegisterStudentComponent, { data: this.seminar });
  }

}
