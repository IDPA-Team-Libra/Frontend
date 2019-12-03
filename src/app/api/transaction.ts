export class Transaction {
    stockSymbol: string;
    stockName: string;
    expectedStockPrice: string;
    amount: number;
    username: string;
    userAuthKey: string;
    date: Date;

    constructor(stockSymbol, stockName, expectedStockPrice, amount) {
        this.stockSymbol = stockSymbol;
        this.stockName = stockName;
        this.expectedStockPrice = expectedStockPrice;
        this.amount = Number(amount);
    }
}
