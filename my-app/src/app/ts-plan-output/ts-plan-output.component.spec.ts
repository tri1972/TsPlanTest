import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TsPlanOutputComponent } from './ts-plan-output.component';

describe('TsPlanOutputComponent', () => {
  let component: TsPlanOutputComponent;
  let fixture: ComponentFixture<TsPlanOutputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TsPlanOutputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TsPlanOutputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
