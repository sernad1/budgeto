"use client";

import { useState } from "react";
import { Transaction, TransactionType } from "@/types/transaction";

interface AddTransactionFormProps {
  onAddTransaction: (transaction: Omit<Transaction, "id">) => void;
}

export default function AddTransactionForm({
  onAddTransaction,
}: AddTransactionFormProps) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<TransactionType>("expense");
  const [category, setCategory] = useState("Jedzenie");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !amount) return;

    onAddTransaction({
      title,
      amount: parseFloat(amount),
      type,
      category,
      date: new Date().toISOString().split("T")[0],
    });
    setTitle("");
    setAmount("");
  };

  return (
    <div className="bg-slate-900/60 p-6 sm:p-8 rounded-3xl border border-slate-800/80 backdrop-blur-xl shadow-xl">
      <h2 className="text-xl font-bold text-white mb-6">
        Dodaj nową transakcję
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/*Przelaczniki przychod/wydatek */}
        <div className="grid grid-cols-2 gap-2 p-1 bg-slate-950/80 rounded-2xl border border-slate-800">
          <button
            type="button"
            onClick={() => setType("expense")}
            className={`py-2.5 rounded-xl text-xs font-bold transition-all ${
              type === "expense"
                ? "bg-pink-500 text-white shadow-lg shadow-pink-500/20"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Wydatek(-)
          </button>

          <button
            type="button"
            onClick={() => setType("income")}
            className={`py-2.5 rounded-xl text-xs font-bold transition-all ${
              type === "income"
                ? "bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Przychód(+)
          </button>
        </div>

        {/*Przelaczniki przychod/wydatek */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
            Tytuł
          </label>
          <input
            type="text"
            required
            placeholder="np. Zakupy spożywcze, Wyplata, Stypendium."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-slate-950/80 border border-slate-800 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 text-slate-100 placeholder:text-slate-600 rounded-xl p-3 text-sm outline-none transition-all"
          />
        </div>

        {/*Kwota i kategoriaa */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
              Kwota (PLN)
            </label>
            <input
              type="number"
              step="0.01"
              required
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-slate-950/80 border border-slate-800 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 text-slate-100 placeholder:text-slate-600 rounded-xl p-3 text-sm outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
              Kategoria
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-slate-950/80 border border-slate-800 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 text-slate-100 placeholder:text-slate-600 rounded-xl p-3 text-sm outline-none transition-all"
            >
              <option value="" disabled>
                --Wybierz kategorie ---
              </option>
              <option value="Jedzenie">Jedzenie</option>
              <option value="Rachunki">Rachunki</option>
              <option value="Transport">Transport</option>
              <option value="Rozrywka">Rozrywka</option>
              <option value="Wynagrodzenie">Wynagrodzenie</option>
              <option value="Inne">Inne</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="mt-2 w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold py-3.5 rounded-xl transition-all duration-200 shadow-lg shadow-emerald-500/20 active:scale-[0.99]"
        >
          Dodaj transakcję
        </button>
      </form>
    </div>
  );
}
