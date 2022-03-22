import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoordinatorloginComponent } from './coordinatorlogin.component';

describe('CoordinatorloginComponent', () => {
  let component: CoordinatorloginComponent;
  let fixture: ComponentFixture<CoordinatorloginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoordinatorloginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoordinatorloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
