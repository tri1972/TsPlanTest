import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TsPlanInputComponent } from './ts-plan-input.component';

describe('TsPlanInputComponent', () => {
  let component: TsPlanInputComponent;
  let fixture: ComponentFixture<TsPlanInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TsPlanInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TsPlanInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
