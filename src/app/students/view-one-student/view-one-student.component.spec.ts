import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOneStudentComponent } from './view-one-student.component';

describe('ViewOneStudentComponent', () => {
  let component: ViewOneStudentComponent;
  let fixture: ComponentFixture<ViewOneStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewOneStudentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewOneStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
