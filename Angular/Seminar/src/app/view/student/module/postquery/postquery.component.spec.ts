import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostqueryComponent } from './postquery.component';

describe('PostqueryComponent', () => {
  let component: PostqueryComponent;
  let fixture: ComponentFixture<PostqueryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostqueryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostqueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
