"use client";
import { Transaction } from "@/types/transaction";

interface TransactionListProps {
  transactions: Transaction[];
  onDeleteTransaction: (id: string) => void;
}

export default function TransactionList({
  transactions,
  onDeleteTransaction,
}: TransactionListProps) {
  if (transactions.length === 0) {
    return (
      <div className="bg-slate-900/60 p-8 rounded-3xl border border-slate-800/80 backdrop-blur-xl text-center text-slate-500 text-sm">
        Brak zarejestrowanych transakcji. Dodaj piewszą powyżej!
      </div>
    );
  }

  return (
    <div className="bg-slate-900/60 p-6 sm:p-8 rounded-3xl border border-slate-800/80 backdrop-blur-xl shadow-xl">
      <h2 className="text-xl font-bold text-white mb-6">Historia transakcji</h2>

      <div className="flex flex-col gap-3">
        {transactions.map((t) => (
          <div
            key={t.id}
            className="flex items-center justify-between p-4 bg-slate-950/60 border border-slate-800/60 rounded-2xl hover:border-slate-700/80 transition-all"
          >
            <div className="flex flex-col gap-0.5">
              <span className="font-semibold text-slate-100 text-sm">
                {t.title}
              </span>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="bg-slate-800 px-2 py-0.5 rounded-md text-slate-300 font-medium">
                  {t.category}
                </span>
                <span>{t.date}</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span
                className={`font-black text-base ${
                  t.type === "income" ? "text-emerald-400" : "text-pink-500"
                }`}
              >
                {t.type === "income" ? "+" : "-"}
                {t.amount.toFixed(2)} zł
              </span>

              <button
                onClick={() => onDeleteTransaction(t.id)}
                className="text-slate-600 hover:text-red-400 transition-colors p-1"
                title="Usuń transakcję"
              >
                X
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
