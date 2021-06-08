import { Injectable } from '@angular/core';
import detectEthereumProvider from '@metamask/detect-provider';
import { BehaviorSubject, from, Observable, of, Subscription } from 'rxjs';
import { catchError, map, take, tap } from 'rxjs/operators';

declare var Web3: any;

@Injectable({
    providedIn: 'root',
})
export class MetamaskService {

    private account: BehaviorSubject<string | null>;
    private web3: BehaviorSubject<any | null>;
    
    private metamaskProvider;
    private subsciptions: Subscription;
    
    //public ethereum: any;
    public account$: Observable<string | null>;
    public web3$: Observable<any | null>;

    constructor() {

      this.account = new BehaviorSubject(null);
      this.web3 = new BehaviorSubject(null);
      this.account$ = this.account.asObservable();
      this.web3$ = this.web3.asObservable();
      // this.subsciptions = new Subscription();

        from(detectEthereumProvider({ mustBeMetaMask: true })).pipe(
          take(1),
          tap((provider) => {
            this.metamaskProvider = provider;
            this.web3.next(new Web3(provider));
          }),
          catchError(error => {
            this.web3.next(null);
            alert("Please install Metamask browser extension");
            return of(error);
          })
        ).subscribe();
    }

    connectToMetamask() {
        if (this.metamaskProvider) {
            from(this.metamaskProvider.request({ method: 'eth_requestAccounts' })).pipe(
                take(1),
                map((accounts) => {
                    return accounts[0];
                }),
                tap(acc => this.account.next(acc)),
                catchError((error) => {
                    if (error.code === 4001) {
                        // EIP-1193 userRejectedRequest error
                        console.log('Please connect to MetaMask.');
                    } else {
                        console.error(error);
                    }
                    this.account.next(null);
                    return of(error);
                })
            )
            .subscribe();
        }
        // else {
        //     alert('please install Metamask Browser Extension');
        //     return of(null);
        // }
    }

    /*
    callFunction(transactionParameters: any) : Observable<any> {
      return from(this.metamaskProvider.request({
        method: 'eth_sendTransaction',
        params: [transactionParameters],
      }));
    };
    */
    
}
