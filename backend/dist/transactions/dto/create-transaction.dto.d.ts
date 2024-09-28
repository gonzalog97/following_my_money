export declare class CreateTransactionDto {
    amount: number;
    type: 'income' | 'expense';
    description?: string;
    date: string;
}
