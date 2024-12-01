import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeBirthdayComponent } from './employee-birthday.component';

describe('EmployeeBirthdayComponent', () => {
  let component: EmployeeBirthdayComponent;
  let fixture: ComponentFixture<EmployeeBirthdayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeBirthdayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeBirthdayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
