import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FunSection } from './fun-section';

describe('FunSection', () => {
  let component: FunSection;
  let fixture: ComponentFixture<FunSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FunSection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FunSection);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
