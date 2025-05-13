import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedeemPtsComponent } from './redeem-pts.component';

describe('RedeemPtsComponent', () => {
  let component: RedeemPtsComponent;
  let fixture: ComponentFixture<RedeemPtsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RedeemPtsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RedeemPtsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
