import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoteRuleComponent } from './vote-rule.component';

describe('VoteRuleComponent', () => {
  let component: VoteRuleComponent;
  let fixture: ComponentFixture<VoteRuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoteRuleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VoteRuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
