import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-coordinator',
  templateUrl: './coordinator.component.html',
  styleUrls: ['./coordinator.component.css']
})
export class CoordinatorComponent implements OnInit {
  constructor(private _activateroute: ActivatedRoute, private router: Router) { }

  oncoor(): void {
    this.router.navigate(['/coordinator/coor-home']);
  }

  onadd(): void {
    this.router.navigate(['/coordinator/add']);
  }

  onshow(): void {
    this.router.navigate(['/coordinator/show']);
  }

  onlogout(): void {
    this.router.navigate(['/home']);
    localStorage.removeItem('userID');
    localStorage.removeItem('isUserLoggedIn');
  }
  ngOnInit(): void {
  }

}
