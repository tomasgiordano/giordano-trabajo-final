import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficosTurnosSolicitadosComponent } from './graficos-turnos-solicitados.component';

describe('GraficosTurnosSolicitadosComponent', () => {
  let component: GraficosTurnosSolicitadosComponent;
  let fixture: ComponentFixture<GraficosTurnosSolicitadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraficosTurnosSolicitadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficosTurnosSolicitadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
