import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarBriefcaseComponent } from './navbar-briefcase.component';

describe('NavbarBriefcaseComponent', () => {
  let component: NavbarBriefcaseComponent;
  let fixture: ComponentFixture<NavbarBriefcaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarBriefcaseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarBriefcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
