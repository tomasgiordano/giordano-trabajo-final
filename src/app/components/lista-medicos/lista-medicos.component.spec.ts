import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaMedicosComponent } from './lista-medicos.component';

describe('ListaMedicosComponent', () => {
  let component: ListaMedicosComponent;
  let fixture: ComponentFixture<ListaMedicosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaMedicosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaMedicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
