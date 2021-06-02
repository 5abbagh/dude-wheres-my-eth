import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyRuleComponent } from './modify-rule.component';

describe('ModifyRuleComponent', () => {
  let component: ModifyRuleComponent;
  let fixture: ComponentFixture<ModifyRuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyRuleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyRuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
