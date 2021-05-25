import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalTurnoDetalleComponent } from './modal-turno-detalle.component';

describe('ModalTurnoDetalleComponent', () => {
  let component: ModalTurnoDetalleComponent;
  let fixture: ComponentFixture<ModalTurnoDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalTurnoDetalleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalTurnoDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
