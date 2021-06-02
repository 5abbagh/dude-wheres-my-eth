import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { ContractService } from '../../contract.service';
import { Rule } from '../../Models';

@Component({
    selector: 'app-modify-rule',
    templateUrl: './modify-rule.component.html',
    styleUrls: ['./modify-rule.component.scss'],
})
export class ModifyRuleComponent implements OnInit {
    currentRule: Rule;

    constructor(private readonly contractService: ContractService) {}

    ngOnInit(): void {
        this.contractService.getRule().pipe(
          tap(rule => this.currentRule = rule)
        ).subscribe();
    }

    modifyAccounts() {}

    addEth() {}

    requestEthBack() {}
}
