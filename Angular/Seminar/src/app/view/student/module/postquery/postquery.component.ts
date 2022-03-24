import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormGroupName } from '@angular/forms';
import { ConnectBackendService } from 'src/app/controller/connect-backend.service';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from 'src/app/view/InfoPopUp/popup/popup.component';
import { Questions } from 'src/app/model/questions';

@Component({
  selector: 'app-postquery',
  templateUrl: './postquery.component.html',
  styleUrls: ['./postquery.component.css']
})
export class PostqueryComponent implements OnInit {
  questions: Questions[] = [];
  queryForm: FormGroup;
  query;
  seminarTitle = localStorage.getItem('seminarTitle');

  constructor(private activatedroute: ActivatedRoute, private router: Router, private connectBackendService: ConnectBackendService, private dialog: MatDialog) {
    this.queryForm = new FormGroup({
      query: new FormControl("", [
        Validators.required,
        Validators.maxLength(100)
      ])
    })
  }

  posted(): void {
    if (this.queryForm.valid) {
      this.query = this.queryForm.controls.query.value;
    }
    this.connectBackendService.postQuery(this.query).subscribe(data => {
      if (!data) {
        var message = "Please enter valid query";
        this.dialog.open(PopupComponent, { data: message });
      }
      else {
        this.questions.push(this.query);
      }
    });
  }
  ngOnInit(): void {
  }

  onLogout() {
    this.router.navigate(['/home']);
    localStorage.removeItem('seminarID');
    localStorage.removeItem('isAttendeeLoggedIn');
    localStorage.removeItem('seminarTitle');
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.queryForm.controls[controlName].hasError(errorName);
  }

}
