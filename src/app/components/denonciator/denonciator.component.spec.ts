import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DenonciatorComponent } from './denonciator.component';

describe('DenonciatorComponent', () => {
  let component: DenonciatorComponent;
  let fixture: ComponentFixture<DenonciatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DenonciatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DenonciatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
