import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficosTurnosFinalizadosComponent } from './graficos-turnos-finalizados.component';

describe('GraficosTurnosFinalizadosComponent', () => {
  let component: GraficosTurnosFinalizadosComponent;
  let fixture: ComponentFixture<GraficosTurnosFinalizadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraficosTurnosFinalizadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficosTurnosFinalizadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
