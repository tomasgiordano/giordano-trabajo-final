import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnosListPacientesComponent } from './turnos-list-pacientes.component';

describe('TurnosListPacientesComponent', () => {
  let component: TurnosListPacientesComponent;
  let fixture: ComponentFixture<TurnosListPacientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TurnosListPacientesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnosListPacientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
