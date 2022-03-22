import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConnectBackendService } from '../../controller/connect-backend.service';
import { Coordinator } from 'src/app/model/coordinator';
import { PopupComponent } from 'src/app/view/InfoPopUp/popup/popup.component';
import { Decision } from 'src/app/model/decision';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  coordinator: Coordinator;
  isRegistered: Decision;

  constructor(private activatedroute: ActivatedRoute, private router: Router, public dialogref: MatDialogRef<RegisterComponent>, private connectBackendService: ConnectBackendService, private dialog: MatDialog) {
    this.registerForm = new FormGroup({
      name: new FormControl("", [
        Validators.required
      ]),
      u_id: new FormControl("", [
        Validators.required,
        Validators.pattern("^[A-Za-z0-9]{1,6}$"),
      ]),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(6)
      ])
    })
  }

  onsubmit() {
    if (this.registerForm.valid) {
      this.coordinator = {
        userName: this.registerForm.controls.name.value,
        userID: this.registerForm.controls.u_id.value,
        password: this.registerForm.controls.password.value
      }
      this.connectBackendService.registerCoordinator(this.coordinator).subscribe(data => {
        this.isRegistered = {
          decision: data[0].isRegistered,
        }
        if (this.isRegistered.decision) {
          var message = "Successfully Registered";
          this.dialog.open(PopupComponent, { data: message });
          this.router.navigate(['/home']);
          this.dialogref.close(true);
        }
        else {
          var message = "Please try another User ID";
          this.dialog.open(PopupComponent, { data: message });
        }
      });
    }
  }

  ngOnInit(): void {
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.registerForm.controls[controlName].hasError(errorName);
  };
}
