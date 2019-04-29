import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerarMultaComponent } from './generar-multa.component';

describe('GenerarMultaComponent', () => {
  let component: GenerarMultaComponent;
  let fixture: ComponentFixture<GenerarMultaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerarMultaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerarMultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
