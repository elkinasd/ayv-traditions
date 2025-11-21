import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnprocessedProductsComponent } from './unprocessed-products.component';

describe('UnprocessedProductsComponent', () => {
  let component: UnprocessedProductsComponent;
  let fixture: ComponentFixture<UnprocessedProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnprocessedProductsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UnprocessedProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
