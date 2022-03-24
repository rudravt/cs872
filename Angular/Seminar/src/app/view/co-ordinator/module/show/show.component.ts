import { Component, HostListener, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ConnectBackendService } from 'src/app/controller/connect-backend.service';
import { Questions } from 'src/app/model/questions';
import { SeminarDetails } from 'src/app/model/seminar-details';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {
  @HostListener('window:focus') onFocus() {
    console.log('window focus');

    this.show();
  }
  seminars: SeminarDetails[];
  seminarTitleForm: FormGroup;
  queries: Questions[];
  priorityQueries: Questions[];

  constructor(private connectBackendService: ConnectBackendService) {
    this.seminarTitleForm = new FormGroup({
      seminarTitle: new FormControl("", [
        Validators.required
      ])
    });
  }

  ngOnInit(): void {
    this.seminars = [];
    this.connectBackendService.getConductedSeminar().subscribe(data => {
      for (var field in data) {
        this.seminars.push(data[field]);
      }
    });
  }

  show() {
    if (this.seminarTitleForm.valid) {
      const title = this.seminarTitleForm.controls.seminarTitle.value;
      this.connectBackendService.getQueries(title).subscribe(data => {
        this.queries = []
        if (data) {
          for (var field in data) {
            this.queries.push(data[field]);
          }
        }
        this.priorityQueries = this.queries.sort((a, b) => {
          return b.frequancy - a.frequancy;
        }).sort((a, b) => {
          return a.priority - b.priority;
        });
      });
    }
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.seminarTitleForm.controls[controlName].hasError(errorName);
  };
}
