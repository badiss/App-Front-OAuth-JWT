import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffectationStudentCoursComponent } from './affectation-student-cours.component';

describe('AffectationStudentCoursComponent', () => {
  let component: AffectationStudentCoursComponent;
  let fixture: ComponentFixture<AffectationStudentCoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AffectationStudentCoursComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AffectationStudentCoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
