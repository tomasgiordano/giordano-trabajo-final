import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficosColumnaComponent } from './graficos-columna.component';

describe('GraficosColumnaComponent', () => {
  let component: GraficosColumnaComponent;
  let fixture: ComponentFixture<GraficosColumnaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraficosColumnaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficosColumnaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
