import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConnectBackendService } from 'src/app/controller/connect-backend.service';
import { Decision } from 'src/app/model/decision';
import { DisplaySeminarComponent } from 'src/app/view/display-seminar/display-seminar.component';
import { PopupComponent } from 'src/app/view/InfoPopUp/popup/popup.component';
import { SeminarLoginInfo } from 'src/app/model/seminar-login-info';

@Component({
  selector: 'app-register-student',
  templateUrl: './register-student.component.html',
  styleUrls: ['./register-student.component.css']
})
export class RegisterStudentComponent implements OnInit {
  registerForm: FormGroup;
  loginInfo: SeminarLoginInfo;
  isRegistered: Decision;

  constructor(public dialogRef: MatDialogRef<DisplaySeminarComponent>,
    @Inject(MAT_DIALOG_DATA) public data, private connectBackendService: ConnectBackendService, private dialog: MatDialog) {
    this.registerForm = new FormGroup({
      name: new FormControl("", [
        Validators.required
      ]),
      emailID: new FormControl("", [
        Validators.required,
        Validators.pattern("^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\.([a-zA-Z]{2,5})$"),
      ])
    })
  }

  ngOnInit(): void {
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.registerForm.controls[controlName].hasError(errorName);
  };

  register() {
    if (this.registerForm.valid) {
      this.loginInfo = {
        seminarID: this.data.seminarID,
        seminarTitle: this.data.title,
        attendeeName: this.registerForm.controls.name.value,
        emailID: this.registerForm.controls.emailID.value
      }
      this.connectBackendService.registerAttendee(this.loginInfo).subscribe(data => {
        this.isRegistered = {
          decision: data[0].isRegistered,
        }
        if (this.isRegistered.decision) {
          this.dialog.closeAll()
          var message = "Please check your Email Inbox or Spam!!";
          this.dialog.open(PopupComponent, { data: message });
        }
        else {
          var message = "Something is Wrong!!!";
          this.dialog.open(PopupComponent, { data: message });
        }
      });
    }
  }

}
