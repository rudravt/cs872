import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupName } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HomeCoordinatorComponent } from '../home-coordinator/home-coordinator.component';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {
  startDate: Date;
  endDate: Date;

  constructor(public dialogRef: MatDialogRef<HomeCoordinatorComponent>,
    @Inject(MAT_DIALOG_DATA) public data,) {
    this.startDate = new Date(data[0].seminarStartingDate);
    this.endDate = new Date(data[0].seminarEndDate);
  }

  ngOnInit(): void {
  }

}
