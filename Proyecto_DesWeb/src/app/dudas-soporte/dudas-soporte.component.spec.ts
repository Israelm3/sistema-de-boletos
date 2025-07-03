import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DudasSoporteComponent } from './dudas-soporte.component';

describe('DudasSoporteComponent', () => {
  let component: DudasSoporteComponent;
  let fixture: ComponentFixture<DudasSoporteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DudasSoporteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DudasSoporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
