import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ContractService } from '../../contract.service';
import { TableAccount } from '../../Models';
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
    table_accounts: TableAccount[] = [
        {
            position: 1,
            address: '0xFFcf8FDEE72ac11b5c542428B35EEF5769C409f0', // Ganach Account 1
        },
        {
            position: 2,
            address: '0x22d491Bde2303f2f43325b2108D26f1eAbA1e32b', // Ganach Account 2
        },
        {
            position: 3,
            address: '0xE11BA2b4D45Eaed5996Cd0823791E0C93114882d', // Ganach Account 3
        },
    ];
    displayedColumns: string[] = ['position', 'address'];
    dataSource: any;

    constructor(private readonly contractService: ContractService) {}

    ngOnInit(): void {
        this.dataSource = this.table_accounts;
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
