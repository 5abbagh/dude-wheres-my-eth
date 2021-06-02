import { Pipe, PipeTransform } from '@angular/core';
import BN from 'bn.js';

declare var Web3: any;
@Pipe({
    name: 'toWei',
})
export class ToWeiPipe implements PipeTransform {
    transform(ethAmount: number): number {
        return Web3.utils.toWei(new BN(ethAmount), 'ether');
    }
}
