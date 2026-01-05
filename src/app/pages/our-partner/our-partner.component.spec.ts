import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OurPartnerComponent } from './our-partner.component';

describe('OurPartnerComponent', () => {
  let component: OurPartnerComponent;
  let fixture: ComponentFixture<OurPartnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OurPartnerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OurPartnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
