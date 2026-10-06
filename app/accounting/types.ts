export type Record = {
  id: number;
  type: "income" | "expense";
  amount: number;
  description: string;
  firestoreId?: string;
};