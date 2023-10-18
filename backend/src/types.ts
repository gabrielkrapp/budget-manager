export interface Budgets {
  id: number;
  userId: number;
  category: string;
  description: string;
  price: number;
}

export interface BudgetsDatabase {
  budgets: Budgets[];
}
