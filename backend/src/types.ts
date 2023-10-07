export interface Budgets {
    id: number;
    category: string;
    price: number;
}
  
export interface BudgetsDatabase {
    budgets: Budgets[];
}
  