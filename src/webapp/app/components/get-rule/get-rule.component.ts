import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ContractService } from '../../contract.service';
import { Rule, TableAccount, Tile } from '../../Models';

@Component({
    selector: 'app-get-rule',
    templateUrl: './get-rule.component.html',
    styleUrls: ['./get-rule.component.scss'],
})
export class GetRuleComponent implements OnInit {
    tableAccounts: TableAccount[] = [];
    displayedColumns: string[] = ['position', 'address'];
    dataSource: any;

    constructor(private readonly contractService: ContractService) {}

    currentRule: Rule = {
        owner: '',
        ethAmount: 0,
        ruleAccounts: [],
        votes: 0,
    };

    ngOnInit(): void {
        this.dataSource = this.tableAccounts;
        this.getCurrentRule();
    }

    private getCurrentRule() {
        this.contractService.getRule().subscribe((rule) => {
            this.currentRule = rule;
            this.convertToTableAccounts();
            this.dataSource = new MatTableDataSource(this.tableAccounts);
        });
    }

    // Converts the list of addresses to Table Accounts
    private convertToTableAccounts() {
        this.currentRule.ruleAccounts.map((address) => {
            this.tableAccounts.push({ position: this.tableAccounts.length + 1, address: address });
        });
    }
}
