import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultasFormComponent } from './multas-form.component';

describe('MultasFormComponent', () => {
  let component: MultasFormComponent;
  let fixture: ComponentFixture<MultasFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultasFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultasFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
