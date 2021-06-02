import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
// import Web3 from 'web3';
import { ContractService } from '../../contract.service';
import { Rule } from '../../Models';
import BN from 'bn.js';

declare var Web3: any;
@Component({
    selector: 'app-modify-rule',
    templateUrl: './modify-rule.component.html',
    styleUrls: ['./modify-rule.component.scss'],
})
export class ModifyRuleComponent implements OnInit {
    currentRule: Rule;
    amountInEth: string;

    constructor(private readonly contractService: ContractService) {}

    ngOnInit(): void {
        this.contractService.getRule().pipe(
          tap(rule => {
              this.currentRule = rule;
              this.amountInEth = Web3.utils.fromWei(new BN(rule.ethAmount), 'ether');
            })
        ).subscribe();
    }

    modifyAccounts() {}

    addEth() {}

    requestEthBack() {}

    addVoterField() {
        if (this.currentRule.ruleAccounts.length < 8) {
            this.currentRule.ruleAccounts = Object.assign([], this.currentRule.ruleAccounts);
            this.currentRule.ruleAccounts.push('');
        }
    }
}
