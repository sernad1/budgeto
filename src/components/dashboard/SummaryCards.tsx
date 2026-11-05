"use client";

import { Transaction } from "@/types/transaction";

interface SummaryCardsProps {
  transactions: Transaction[];
}

export default function SummaryCards({ transactions }: SummaryCardsProps) {
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);

  const balance = totalIncome - totalExpense;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {/*Saldo Calkowite*/}
      <div className="relative overflow-hidden bg-slate-900/60 p-6 rounded-3xl border border-slate-800/80 backdrop-blur-xl shadow-xl">
        <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none " />
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
          Saldo całkowite
        </p>
        <p
          className={`text-3xl font-black ${balance >= 0 ? "text-cyan-400" : "text-rose-400"}`}
        >
          {balance.toFixed(2)} zł
        </p>
      </div>

      {/*Przychody*/}

      <div className="relative overflow-hidden bg-slate-900/60 p-6 rounded-3xl border border-slate-800/80 backdrop-blur-xl shadow-xl">
        <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
          Przychody
        </p>
        <p className="text-3xl font-black text-emerald-400">
          +{totalIncome.toFixed(2)} zł
        </p>
      </div>
      {/*Wydatki*/}

      <div className="relative overflow-hidden bg-slate-900/60 p-6 rounded-3xl border border-slate-800/80 backdrop-blur-xl shadow-xl">
        <div className="absolute top-0 right-0 w-24 h-24 bg-pink-500/10 rounded-full blur-2xl pointer-events-none" />
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
          Wydatki
        </p>
        <p className="text-3xl font-black text-pink-400">
          -{totalExpense.toFixed(2)} zł
        </p>
      </div>
    </div>
  );
}
