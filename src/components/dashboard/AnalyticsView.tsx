"use client";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { Transaction } from "@/types/transaction";

interface AnalyticsProps {
  transactions: Transaction[];
}

const COLORS = [
  "#F43F5E",
  "#3B82F6",
  "#F59E0B",
  "#8B5CF6",
  "#EC4899",
  "#14B8A6",
  "#10B981",
];

export default function AnalyticsView({ transactions }: AnalyticsProps) {
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + Number(t.amount || 0), 0);

  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + Number(t.amount || 0), 0);

  const summaryData = [
    { name: "Przychody", amount: totalIncome, fill: "#10B981" },
    { name: "Wydatki", amount: totalExpense, fill: "#F43F5E" },
  ];

  const expenseByCategory = transactions
    .filter((t) => t.type === "expense")
    .reduce(
      (acc, t) => {
        const amount = Number(t.amount || 0);
        const cat = t.category || "Inne";
        acc[cat] = (acc[cat] || 0) + amount;
        return acc;
      },
      {} as Record<string, number>,
    );

  const categoryData = Object.keys(expenseByCategory).map((cat) => ({
    name: cat,
    value: expenseByCategory[cat],
  }));

  const hasExpenses = categoryData.length > 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Wykres 1: Bilans przychodów i wydatków */}
      <div className="bg-slate-900/60 p-6 rounded-3xl border border-slate-800/80 backdrop-blur-xl">
        <h3 className="text-lg font-bold text-white mb-4 text-center">
          Porównanie przychodów i wydatków
        </h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={summaryData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="name" stroke="#94A3B8" />
              <YAxis stroke="#94A3B8" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0F172A",
                  borderColor: "#334155",
                  borderRadius: "12px",
                }}
                labelStyle={{ color: "#FFFFFF", fontWeight: "bold" }}
                itemStyle={{ color: "#38BDF8" }}
                formatter={(value: any) => [`${value} PLN`, "Kwota"]}
              />
              <Bar dataKey="amount" radius={[8, 8, 0, 0]}>
                {summaryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Wykres 2: Podział wydatków według kategorii */}
      <div className="bg-slate-900/60 p-6 rounded-3xl border border-slate-800/80 backdrop-blur-xl">
        <h3 className="text-lg font-bold text-white mb-4 text-center">
          Wydatki według kategorii
        </h3>
        <div className="h-72 flex items-center justify-center">
          {!hasExpenses ? (
            <div className="text-slate-500 font-medium text-center">
              Brak wydatków do wyświetlenia
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart margin={{ top: 10, right: 45, left: 45, bottom: 10 }}>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  outerRadius={70}
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name} ${((percent || 0) * 100).toFixed(0)}%`
                  }
                >
                  {categoryData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0F172A",
                    borderColor: "#334155",
                    borderRadius: "12px",
                  }}
                  labelStyle={{ color: "#FFFFFF", fontWeight: "bold" }}
                  itemStyle={{ color: "#38BDF8" }}
                  formatter={(value: any) => [`${value} PLN`, "Kwota"]}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
}
