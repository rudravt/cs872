import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormGroupName } from '@angular/forms';
import { SeminarDetails } from 'src/app/model/seminar-details';
import { ConnectBackendService } from 'src/app/controller/connect-backend.service';
import { PopupComponent } from 'src/app/view/InfoPopUp/popup/popup.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  addForm: FormGroup;
  seminarDetails: SeminarDetails;

  constructor(private _activatedroute: ActivatedRoute, private _router: Router, private connectBackendService: ConnectBackendService, private dialog: MatDialog) {
    this.addForm = new FormGroup({
      title: new FormControl("", [
        Validators.required
      ]),
      speakername: new FormControl(""),
      abstract: new FormControl("", [
        Validators.required
      ]),
      startDate: new FormControl(),
      endDate: new FormControl(),
      venue: new FormControl("")
    })
  }

  ngOnInit(): void {
  }

  onAdd(): void {
    if (this.addForm.valid) {
      this.seminarDetails = {
        title: this.addForm.controls.title.value,
        speakerName: this.addForm.controls.speakername.value,
        abstract: this.addForm.controls.abstract.value,
        venue: this.addForm.controls.venue.value,
        startDate: this.addForm.controls.startDate.value,
        endDate: this.addForm.controls.endDate.value
      }
      this.connectBackendService.addSeminar(this.seminarDetails)
        .subscribe(msg => {
          if (msg) {
            var message = "Added!!!";
            this.dialog.open(PopupComponent, { data: message });
            this._router.navigate(['/coordinator/coor-home']);
          }
        })
    }
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.addForm.controls[controlName].hasError(errorName);
  };

}
