import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { filter, map, take, tap } from 'rxjs/operators';
import { MetamaskService } from './metamask.service';
import { abi } from '../../smart-contract/build/contracts/DudeWheresMyEth.json';
import BN from 'bn.js';
import { Rule } from './Models';

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

    constructor(private readonly metamaskService: MetamaskService) {
        this.metamaskService.web3$
            .pipe(
                filter((val) => !!val),
                take(1),
                tap((web3) => {
                    console.log(abi);
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
            return from(this.contract.methods.getRule().call()).pipe(
                take(1),
                map((rule) => {
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
        console.log(ruleAccounts);
        if (this.contract) {
            from(this.contract.methods.addRule(ruleAccounts).send({ from: this.myAddress }))
                .pipe(tap((res) => console.log(res)))
                .subscribe();
        }
    }

    modifyRuleAccounts(ruleAccounts: string[]) {
        if (this.contract && this.myAddress) {
            from(this.contract.methods.modifyRuleAccounts(ruleAccounts).send({ from: this.myAddress }))
                .pipe(
                    //take(1),
                    tap((res) => console.log(res))
                )
                .subscribe();
        }
    }

    addEthToRule(ethAmount: number) {
        if (this.contract && this.myAddress) {
            from(
                this.contract.methods
                    .addEthToRule()
                    .send({ from: this.myAddress, value: Web3.utils.toWei(new BN(ethAmount), 'ether') })
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
            from(
                this.contract.methods
                    .requestEthBack(Web3.utils.toWei(new BN(ethAmount), 'ether'))
                    .send({ from: this.myAddress })
            )
                .pipe(
                    //take(1),
                    tap((res) => console.log(res))
                )
                .subscribe();
        }
    }

    // removeRule(account: string) {}

    // voteToWithdraw(account: string, ruleOwnerAddress: string) {}
}
