import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplaySeminarComponent } from './display-seminar.component';

describe('DisplaySeminarComponent', () => {
  let component: DisplaySeminarComponent;
  let fixture: ComponentFixture<DisplaySeminarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplaySeminarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplaySeminarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
