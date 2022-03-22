import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Coordinator } from 'src/app/model/coordinator';
import { ConnectBackendService } from '../../controller/connect-backend.service';
import { PopupComponent } from 'src/app/view/InfoPopUp/popup/popup.component';
import { Decision } from 'src/app/model/decision';

@Component({
  selector: 'app-coordinatorlogin',
  templateUrl: './coordinatorlogin.component.html',
  styleUrls: ['./coordinatorlogin.component.css']
})
export class CoordinatorloginComponent implements OnInit {
  coordinatorloginForm: FormGroup;
  coordinator: Coordinator;
  isLoggedIn: Decision;

  constructor(private dialog: MatDialog, private activatedroute: ActivatedRoute, private router: Router, public dialogref: MatDialogRef<CoordinatorloginComponent>, private connectBackendService: ConnectBackendService) {
    this.coordinatorloginForm = new FormGroup({
      u_id: new FormControl("", [
        Validators.required
      ]),
      password: new FormControl("", [
        Validators.required
      ])
    })
  }

  oncoordiclick(): void {
    if (this.coordinatorloginForm.valid) {
      this.coordinator = {
        userID: this.coordinatorloginForm.controls.u_id.value,
        password: this.coordinatorloginForm.controls.password.value
      }
      this.connectBackendService.loginCoordinator(this.coordinator).subscribe(data => {
        this.isLoggedIn = {
          decision: data[0].isLoggedIn
        }
        if (this.isLoggedIn.decision) {
          localStorage.setItem('userID', this.coordinator.userID);
          localStorage.setItem('isUserLoggedIn', 'true');
          this.router.navigate(['/coordinator/coor-home']);
          this.dialogref.close(true);
        }
        else {
          var message = "Please enter valid User ID and Password";
          this.dialog.open(PopupComponent, { data: message });
        }
      });
    }
  }
  ngOnInit(): void { }
  public hasError = (controlName: string, errorName: string) => {
    return this.coordinatorloginForm.controls[controlName].hasError(errorName);
  };
}
