import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfesionalHoraComponent } from './profesional-hora.component';

describe('ProfesionalHoraComponent', () => {
  let component: ProfesionalHoraComponent;
  let fixture: ComponentFixture<ProfesionalHoraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfesionalHoraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfesionalHoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
