export class Stock {
    symbol: string;
    price: string;
    data: string;
    company: string;

    constructor(symbol, price, data, company) {
        this.symbol = symbol;
        this.price = price;
        this.data = data;
        this.company = company;
    }
}
