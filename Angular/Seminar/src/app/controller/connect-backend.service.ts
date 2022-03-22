import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Coordinator } from '../model/coordinator';
import { SeminarDetails } from '../model/seminar-details';
import { SeminarLoginInfo } from '../model/seminar-login-info';
import { Decision } from '../model/decision';
import { Questions } from '../model/questions';

@Injectable({
  providedIn: 'root'
})
export class ConnectBackendService {

  constructor(private http: HttpClient) { }

  // seminarDetails: SeminarDetails[] = [];
  // coordinatorData$: Observable<SeminarDetails[]>;

  coordinatorData$: BehaviorSubject<SeminarDetails[]> = new BehaviorSubject(null);
  coordinatoData: Observable<SeminarDetails[]> = this.coordinatorData$.asObservable();

  baseURL = 'http://localhost:4000/';

  registerCoordinator(coordinator: Coordinator): Observable<Decision> {
    const header = { 'content-type': 'application/json' }
    const body = {
      userName: coordinator.userName,
      userID: coordinator.userID,
      password: coordinator.password
    }
    return this.http.post<Decision>(this.baseURL + 'register/userRegistration', body, { 'headers': header });
  }

  loginCoordinator(coordinator: Coordinator): Observable<Decision> {
    const query = {
      userID: coordinator.userID,
      password: coordinator.password
    }
    return this.http.get<Decision>(this.baseURL + 'login/conductorLogin', { params: query });
  }

  addSeminar(seminarDetails: SeminarDetails) {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers.append('responseType', 'text');
    const httpOptions = {
      headers: headers
    };
    const body = {
      seminarTitle: seminarDetails.title,
      speaker: seminarDetails.speakerName,
      abstract: seminarDetails.abstract,
      venue: seminarDetails.venue,
      seminarStartingDate: seminarDetails.startDate,
      seminarEndDate: seminarDetails.endDate,
      userID: localStorage.getItem('userID')
    }
    return this.http.post(this.baseURL + 'seminarDetails/insertDetails', body, httpOptions);
  }

  getConductedSeminar(): Observable<SeminarDetails[]> {
    const query = {
      userID: localStorage.getItem('userID'),
    }
    return this.http.get<SeminarDetails[]>(this.baseURL + 'coordinator/allSeminarConducted', { params: query });
  }

  editSeminar(seminarDetail: SeminarDetails) {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const httpOptions = {
      headers: headers
    };
    const body = {
      seminarID: seminarDetail.seminarID,
      speaker: seminarDetail.speakerName,
      venue: seminarDetail.venue,
      seminarStartingDate: seminarDetail.startDate,
      seminarEndDate: seminarDetail.endDate
    }
    return this.http.put(this.baseURL + 'coordinator/updateSeminarDetails', body, httpOptions);
  }

  getAllSeminar(): Observable<SeminarDetails> {
    return this.http.get<SeminarDetails>(this.baseURL + 'home/getSeminars');
  }

  registerAttendee(registerDetails: SeminarLoginInfo): Observable<Decision> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const httpOptions = {
      headers: headers
    };
    const body = {
      name: registerDetails.attendeeName,
      emailID: registerDetails.emailID,
      seminarID: registerDetails.seminarID,
      seminarTitle: registerDetails.seminarTitle
    }
    return this.http.post<Decision>(this.baseURL + 'register/attenderRegistration', body, httpOptions);
  }

  AttendeeLogin(loginInfo: SeminarLoginInfo): Observable<Decision> {
    const query = {
      seminarTitle: loginInfo.seminarTitle,
      seminarID: loginInfo.seminarID
    }
    return this.http.get<Decision>(this.baseURL + 'login/attenderLogin', { params: query });
  }

  postQuery(query: string) {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const httpOptions = {
      headers: headers
    };
    const body = {
      query: query,
      seminarTitle: localStorage.getItem('seminarTitle'),
      ID: localStorage.getItem('seminarID')
    }
    return this.http.post(this.baseURL + 'attender/query', body, httpOptions);
  }

  getQueries(ID): Observable<Questions[]> {
    const query = {
      seminarID: ID,
    }
    return this.http.get<Questions[]>(this.baseURL + 'coordinator/getQueries', { params: query });
  }

  deleteSeminar(ID) {
    const query = {
      seminarID: ID,
    }
    return this.http.delete(this.baseURL + 'coordinator/deleteSeminar', { params: query })
  }
}
