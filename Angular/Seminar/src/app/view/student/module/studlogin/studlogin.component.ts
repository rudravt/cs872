import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConnectBackendService } from 'src/app/controller/connect-backend.service';
import { SeminarLoginInfo } from 'src/app/model/seminar-login-info';
import { PopupComponent } from 'src/app/view/InfoPopUp/popup/popup.component';
import { Decision } from 'src/app/model/decision';

@Component({
  selector: 'app-studlogin',
  templateUrl: './studlogin.component.html',
  styleUrls: ['./studlogin.component.css']
})
export class StudloginComponent implements OnInit {
  seminars = [];
  loginInfo: SeminarLoginInfo;
  studloginForm: FormGroup;
  isLoggedIn: Decision;

  constructor(private _activateroute: ActivatedRoute, private router: Router, public dialogref: MatDialogRef<StudloginComponent>, private connectBackendService: ConnectBackendService, private dialog: MatDialog) {
    this.studloginForm = new FormGroup({
      seminarTitle: new FormControl("", [
        Validators.required
      ]),
      password: new FormControl("", [
        Validators.required
      ])
    })
  }

  ngOnInit(): void {
    this.connectBackendService.getAllSeminar().subscribe(data => {
      for (var field in data) {
        this.seminars.push(data[field].seminarTitle);
      }
    })
  }
  onstudclick(): void {
    if (this.studloginForm.valid) {
      this.loginInfo = {
        seminarID: this.studloginForm.controls.password.value,
        seminarTitle: this.studloginForm.controls.seminarTitle.value
      }
      this.connectBackendService.AttendeeLogin(this.loginInfo).subscribe(data => {
        this.isLoggedIn = {
          decision: data[0].isLoggedIn
        }
        if (this.isLoggedIn.decision) {
          localStorage.setItem('seminarID', this.loginInfo.seminarID);
          localStorage.setItem('seminarTitle', this.loginInfo.seminarTitle);
          localStorage.setItem('isAttendeeLoggedIn', 'true');
          this.router.navigate(['/students']);
          this.dialogref.close(true);
        }
        else {
          var message = "Please enter valid Password";
          this.dialog.open(PopupComponent, { data: message });
        }
      })
    }
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.studloginForm.controls[controlName].hasError(errorName);
  };

}
