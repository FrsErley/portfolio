import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PixelRain } from './pixel-rain';

describe('PixelRain', () => {
  let component: PixelRain;
  let fixture: ComponentFixture<PixelRain>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PixelRain]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PixelRain);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
