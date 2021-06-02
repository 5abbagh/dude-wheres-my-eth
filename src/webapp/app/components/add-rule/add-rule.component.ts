import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ContractService } from '../../contract.service';
export interface tableAccount {
    position: number;
    address: string;
}
@Component({
    selector: 'app-add-rule',
    templateUrl: './add-rule.component.html',
    styleUrls: ['./add-rule.component.scss'],
})
export class AddRuleComponent implements OnInit {
    maxAmountOfChars = 42;
    etherFormControl = new FormControl('', [Validators.required]);
    trusteesFormControl = new FormControl('', [
        Validators.required,
        Validators.minLength(this.maxAmountOfChars),
        Validators.maxLength(this.maxAmountOfChars),
    ]);
    table_accounts: tableAccount[] = [
        {
            position: 1,
            address: '0x1dF62f291b2E969fB0849d99D9Ce41e2F137006e', // Ganach Account9
        },
        {
            position: 2,
            address: '0xACa94ef8bD5ffEE41947b4585a84BdA5a3d3DA6E', // Ganach Account 8
        },
        {
            position: 3,
            address: '0xFFcf8FDEE72ac11b5c542428B35EEF5769C409f0', // Ganach Account 2
        },
    ];
    displayedColumns: string[] = ['position', 'address'];
    dataSource: any;

    constructor(private readonly contractService: ContractService) {}

    ngOnInit(): void {
        this.dataSource = this.table_accounts;
        this.trusteesFormControl.value;
    }

    addTrustee() {
        this.table_accounts.push({ position: this.table_accounts.length + 1, address: this.trusteesFormControl.value });
        this.dataSource = new MatTableDataSource(this.table_accounts);
    }

    addRule() {
        this.contractService.addRule(
            this.etherFormControl.value,
            this.table_accounts.map((ele) => ele.address)
        );
    }
}
