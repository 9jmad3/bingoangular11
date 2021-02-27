import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerderechoComponent } from './bannerderecho.component';

describe('BannerderechoComponent', () => {
  let component: BannerderechoComponent;
  let fixture: ComponentFixture<BannerderechoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BannerderechoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerderechoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
