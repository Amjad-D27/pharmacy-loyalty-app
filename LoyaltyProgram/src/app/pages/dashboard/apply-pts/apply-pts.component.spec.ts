import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyPtsComponent } from './apply-pts.component';

describe('ApplyPtsComponent', () => {
  let component: ApplyPtsComponent;
  let fixture: ComponentFixture<ApplyPtsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplyPtsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplyPtsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
