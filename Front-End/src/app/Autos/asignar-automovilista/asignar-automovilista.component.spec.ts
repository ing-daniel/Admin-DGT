import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarAutomovilistaComponent } from './asignar-automovilista.component';

describe('AsignarAutomovilistaComponent', () => {
  let component: AsignarAutomovilistaComponent;
  let fixture: ComponentFixture<AsignarAutomovilistaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsignarAutomovilistaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignarAutomovilistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
