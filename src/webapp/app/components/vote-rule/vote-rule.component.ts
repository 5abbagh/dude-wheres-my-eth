import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ContractService } from '../../contract.service';

@Component({
  selector: 'app-vote-rule',
  templateUrl: './vote-rule.component.html',
  styleUrls: ['./vote-rule.component.scss']
})
export class VoteRuleComponent {

  maxAmountOfChars = 42;
  addressFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(this.maxAmountOfChars),
    Validators.maxLength(this.maxAmountOfChars),
  ]);

  mockAddress = "0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1";

  constructor(private readonly contractService: ContractService) { }

  voteForRule() {
      this.contractService.voteToWithdraw(
          this.addressFormControl.value,
      );
  }
}
