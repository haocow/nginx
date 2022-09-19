export interface Diner {
    name: string
}

export interface Item {
    amount: string;
    checked: boolean;
    id: number;
    name: string;
    selected: Set<string>;
    shares: {
        first: number;
        rest: number;
    }
}
