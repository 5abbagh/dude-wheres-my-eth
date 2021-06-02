import { Pipe, PipeTransform } from '@angular/core';
import BN from 'bn.js';

declare var Web3: any;
@Pipe({
    name: 'toEther',
})
export class ToEtherPipe implements PipeTransform {
    transform(amountOfWei: number): number {
        return Web3.utils.fromWei(new BN(amountOfWei), 'ether');
    }
}
