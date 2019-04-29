import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SinDatosComponent } from './sin-datos.component';

describe('SinDatosComponent', () => {
  let component: SinDatosComponent;
  let fixture: ComponentFixture<SinDatosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SinDatosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SinDatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
