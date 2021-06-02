import { Component, OnDestroy, OnInit } from '@angular/core';
import detectEthereumProvider from '@metamask/detect-provider';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ContractService } from './contract.service';
import { MetamaskService } from './metamask.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
    title = 'Dude Wheres My Eth';
    subscriptions: Subscription;
    account: string;
    btnText: string;

    constructor(private readonly metamaskService: MetamaskService, private readonly contractService: ContractService) {}

    ngOnInit(): void {
        this.subscriptions = new Subscription();
        this.metamaskService.account$
            .pipe(
                tap((account) => {
                    this.account = account;
                    this.btnText = account ?? 'Connect';
                })
            )
            .subscribe();
    }

    connect() {
        this.metamaskService.connectToMetamask();
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }
}
