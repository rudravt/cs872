import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddComponent } from 'src/app/UIComponent/add/add.component';
import { RegisterComponent } from 'src/app/UIComponent/register/register.component';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<RegisterComponent, AddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,) { }

  ngOnInit(): void {
  }

}
