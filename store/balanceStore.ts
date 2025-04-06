import { create } from 'zustand';
import { zustandStorage } from '@/store/mmkv-storage';
import { createJSONStorage, persist } from 'zustand/middleware';
export interface Transaction {
    id: string;
    amount: number;
    date: Date;
    title: string;
}

export interface BalanceStore {
    balance: () => number;
    transactions: Array<Transaction>;
    runTransaction: (transaction: Transaction) => void;
    clearTransaction: () => void;
}

export const useBalanceStore = create<BalanceStore>()(
    persist((set, get) => ({
        transactions: [],
        runTransaction: (transaction: Transaction) => {
            set((state) => ({ transactions: [...state.transactions, transaction]}))
        },
        balance: () => get().transactions.reduce((acc, transaction) => acc + transaction.amount, 0),
        clearTransaction: () => {
          set({ transactions: []})
        },
    }), {
        name: 'balance',
        storage: createJSONStorage(() => zustandStorage),
    })
)