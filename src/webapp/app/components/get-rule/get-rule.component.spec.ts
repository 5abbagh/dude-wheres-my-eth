import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetRuleComponent } from './get-rule.component';

describe('GetRuleComponent', () => {
  let component: GetRuleComponent;
  let fixture: ComponentFixture<GetRuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetRuleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetRuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
