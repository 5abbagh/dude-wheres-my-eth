import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
// import Web3 from 'web3';
import { ContractService } from '../../contract.service';
import { Rule } from '../../Models';
import BN from 'bn.js';
import { FormControl } from '@angular/forms';
import { ToEtherPipe } from '../../pipes/to-ether.pipe';

declare var Web3: any;
@Component({
    selector: 'app-modify-rule',
    templateUrl: './modify-rule.component.html',
    styleUrls: ['./modify-rule.component.scss'],
})
export class ModifyRuleComponent implements OnInit {
    currentRule: Rule;
    currentAmountInEth: number;

    requestedAmount = new FormControl(0);
    addedAmount = new FormControl(0);

    constructor(private readonly contractService: ContractService, private readonly toEtherPipe: ToEtherPipe) {}

    ngOnInit(): void {
        this.contractService.getRule().pipe(
          tap(rule => {
              this.currentRule = rule;
              this.currentAmountInEth = rule ? this.toEtherPipe.transform(rule.ethAmount) : 0;
            })
        ).subscribe();
    }

    // modifyAccounts() {
    //     console.log(this.currentRule.ruleAccounts);
    //     this.contractService.modifyRuleAccounts(this.currentRule?.ruleAccounts);
    // }

    addEth() {
        console.log(this.addedAmount.value)
        this.contractService.addEthToRule(this.addedAmount.value);
    }

    requestEthBack() {
        this.contractService.requestEthBack(this.requestedAmount.value);
    }

    // addVoterField() {
    //     if (this.currentRule?.ruleAccounts.length < 7) {
    //         this.currentRule.ruleAccounts = Object.assign([], this.currentRule.ruleAccounts);
    //         this.currentRule.ruleAccounts.push('');
    //     }
    // }

    // removeVoter(index) {
    //     if (this.currentRule?.ruleAccounts.length > 3) {
    //         this.currentRule.ruleAccounts = Object.assign([], this.currentRule.ruleAccounts);
    //         this.currentRule.ruleAccounts.splice(index,1);
    //     }
    // }
}
