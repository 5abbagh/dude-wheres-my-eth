export interface Rule {
    owner: string;
    ethAmount: number;
    ruleAccounts: string[];
    votes: number;
}
export interface TableAccount {
    position: number;
    address: string;
}
export interface Tile {
    color: string;
    cols: number;
    rows: number;
    text: string;
}
