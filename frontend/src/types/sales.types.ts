export interface SaleEvent {
  transaction_id: string;
  timestamp: string;
  amount: number;
  category: string;
  region: string;
  user_id: string;
}

export interface CategorySales {
  category: string;
  total_sales: number;
}

export interface DateRange {
  from: string | null;
  to: string | null;
}
