import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { filter, map, take, tap } from 'rxjs/operators';
import { MetamaskService } from './metamask.service';
import { abi } from '../../smart-contract/build/contracts/DudeWheresMyEth.json';
import BN from 'bn.js';
import { Rule } from './Models';
import { ToEtherPipe } from './pipes/to-ether.pipe';
import { ToWeiPipe } from './pipes/to-wei.pipe';

declare var Web3: any;

@Injectable({
    providedIn: 'root',
})
export class ContractService {
    // INSERT contract address here after deploying it to ganache
    // for now it will always be this when launched deterministic
    private contractAddress: string = '0xCfEB869F69431e42cdB54A4F4f105C19C080A601';
    private contract: any;
    private myAddress: string;

    constructor(
        private readonly metamaskService: MetamaskService,
        private toEtherPipe: ToEtherPipe,
        private toWeiPipe: ToWeiPipe
    ) {
        this.metamaskService.web3$
            .pipe(
                filter((val) => !!val),
                take(1),
                tap((web3) => {
                    this.contract = new web3.eth.Contract(abi, this.contractAddress);
                })
            )
            .subscribe();

        this.metamaskService.account$
            .pipe(
                filter((val) => !!val),
                take(1),
                tap((acc) => {
                    this.myAddress = acc;
                })
            )
            .subscribe();
    }

    getRule(): Observable<Rule> {
        if (this.contract) {
            return from(this.contract.methods.getRule().call({from: this.myAddress})).pipe(
                take(1),
                map((rule) => {
                    if (rule['0'].length == 0) {
                        return null;
                    }
                    return {
                        owner: this.myAddress,
                        ethAmount: rule['1'],
                        ruleAccounts: rule['0'],
                        votes: rule['2'],
                    };
                })
            );
        }
    }

    addRule(ethAmount: number, ruleAccounts: string[]) {
        if (this.contract) {
            this.getNonce();
            from(
                this.contract.methods
                    .addRule(ruleAccounts)
                    .send({ from: this.myAddress, value: this.toWeiPipe.transform(ethAmount) })
            )
                .pipe(tap((res) => console.log(res)))
                .subscribe();
        }
    }

    // modifyRuleAccounts(ruleAccounts: string[]) {
    //     if (this.contract && this.myAddress) {
    //         this.getNonce();
    //         from(this.contract.methods.modifyRuleAccounts(ruleAccounts).send({ from: this.myAddress }))
    //             .pipe(
    //                 //take(1),
    //                 tap((res) => console.log(res))
    //             )
    //             .subscribe();
    //     }
    // }

    addEthToRule(ethAmount: number) {
        if (this.contract && this.myAddress) {
            this.getNonce();
            from(
                this.contract.methods
                    .addEthToRule()
                    .send({ from: this.myAddress, value: this.toWeiPipe.transform(ethAmount) })
            )
                .pipe(
                    //take(1),
                    tap((res) => console.log(res))
                )
                .subscribe();
        }
    }

    // need to check for transaction signing.. and event listening to notify user
    requestEthBack(ethAmount: number) {
        if (this.contract && this.myAddress) {
            this.getNonce();
            from(
                this.contract.methods.requestEthBack(this.toWeiPipe.transform(ethAmount)).send({ from: this.myAddress })
            )
                .pipe(
                    //take(1),
                    tap((res) => console.log(res))
                )
                .subscribe();
        }
    }

    removeRule() {
        if (this.contract && this.myAddress) {
            this.getNonce();
            from(
                this.contract.methods.removeRule().send({ from: this.myAddress })
            )
                .pipe(
                    //take(1),
                    tap((res) => console.log(res))
                )
                .subscribe();
        }
    }

    voteToWithdraw(ruleOwnerAddress: string) {
        if (this.contract && this.myAddress) {
            this.getNonce();
            from(
                this.contract.methods.voteToWithdraw(ruleOwnerAddress).send({ from: this.myAddress })
            )
                .pipe(
                    //take(1),
                    tap((res) => console.log(res))
                )
                .subscribe();
        }
    }

    private getNonce() {
        this.metamaskService.web3$.pipe(
            filter((val) => !!val),
            take(1),
            map((web3) => {
                console.log("Nonce: ", web3.eth.getTransactionCount(this.myAddress));
            })
        ).subscribe();
    }
}
