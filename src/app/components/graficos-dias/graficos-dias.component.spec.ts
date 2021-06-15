import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficosDiasComponent } from './graficos-dias.component';

describe('GraficosDiasComponent', () => {
  let component: GraficosDiasComponent;
  let fixture: ComponentFixture<GraficosDiasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraficosDiasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficosDiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
