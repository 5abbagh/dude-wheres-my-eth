import { Component, OnDestroy, OnInit } from '@angular/core';
import detectEthereumProvider from '@metamask/detect-provider';
import { from, Observable, of, Subscription } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
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
        this.metamaskService.account$.pipe(
            tap(account => {
                this.account = account;
                this.btnText = account ?? 'Connect';
            })
        ).subscribe();
    }

    connect() {
        this.metamaskService.connectToMetamask();
    }

    getMyRule() {
        this.contractService.getRule();
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }
}
