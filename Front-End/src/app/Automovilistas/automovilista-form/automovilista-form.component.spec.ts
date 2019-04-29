import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutomovilistaFormComponent } from './automovilista-form.component';

describe('AutomovilistaFormComponent', () => {
  let component: AutomovilistaFormComponent;
  let fixture: ComponentFixture<AutomovilistaFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutomovilistaFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutomovilistaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
