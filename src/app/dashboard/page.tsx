"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/dashboard/Sidebar";
import SummaryCards from "@/components/dashboard/SummaryCards";
import AddTransactionForm from "@/components/dashboard/AddTransactionForm";
import TransactionList from "@/components/dashboard/TransactionList";
import { Transaction } from "@/types/transaction";
import AnalyticsView from "@/components/dashboard/AnalyticsView";
import SettingsView from "@/components/dashboard/SettingsView";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [user, setUser] = useState<{
    id?: string;
    firstName?: string;
    email?: string;
  } | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      router.push("/login");
      return;
    }
    const parsedUser = JSON.parse(storedUser);
    setUser(parsedUser);

    if (parsedUser.id) {
      fetchTransactions(parsedUser.id);
    }
  }, [router]);

  const fetchTransactions = async (userId: string) => {
    try {
      const res = await fetch(`/api/transactions?userId=${userId}`);
      if (res.ok) {
        const data = await res.json();
        const formatted = data.map((item: any) => ({
          id: item._id,
          title: item.title,
          amount: item.amount,
          type: item.type,
          category: item.category,
          date: item.date,
        }));
        setTransactions(formatted);
      }
    } catch (err) {
      console.error("Błąd pobierania danych:", err);
    } finally {
      setLoading(false);
    }
  };
  const handleUserUpdate = (updatedUser: any) => {
    const updatedName = updatedUser.name || updatedUser.firstName;

    const newUserData = {
      ...user,
      ...updatedUser,
      name: updatedName,
      firstName: updatedName, // 👈 Zapewnia poprawny odczyt w nagłówku
    };

    setUser(newUserData);
    localStorage.setItem("user", JSON.stringify(newUserData));
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/login");
  };

  const handleAddTransaction = async (newTx: Omit<Transaction, "id">) => {
    if (!user?.id) return;

    try {
      const res = await fetch("/api/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...newTx, userId: user.id }),
      });

      if (res.ok) {
        const created = await res.json();
        const formatted: Transaction = {
          id: created._id,
          title: created.title,
          amount: created.amount,
          type: created.type,
          category: created.category,
          date: created.date,
        };
        setTransactions((prev) => [formatted, ...prev]);
      }
    } catch (err) {
      console.error("Błąd dodawania transakcji:", err);
    }
  };

  const handleDeleteTransaction = async (id: string) => {
    try {
      const res = await fetch(`/api/transactions/${id}`, { method: "DELETE" });
      if (res.ok) {
        setTransactions((prev) => prev.filter((t) => t.id !== id));
      }
    } catch (err) {
      console.error("Błąd usuwania transakcji:", err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex justify-center items-center font-bold">
        Ładowanie danych z bazy...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row relative">
      {/* Sidebar z lewej strony */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        user={user}
        onLogout={handleLogout}
      />

      {/* Główna zawartość strony */}
      <main className="flex-1 p-4 sm:p-8 relative overflow-hidden">
        {/* Tło z poświatami */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto flex flex-col gap-8 relative z-10">
          {/* Nagłówek wewnątrz sekcji głównej */}
          <div className="flex justify-between items-center bg-slate-900/60 p-6 rounded-3xl border border-slate-800/80 backdrop-blur-xl">
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Cześć,{" "}
                <span className="text-emerald-400">
                  {user?.firstName || "Użytkowniku"}
                </span>
                ! 👋
              </h1>
              <p className="text-slate-400 text-xs sm:text-sm mt-0.5">
                Oto podsumowanie Twojego budżetu.
              </p>
            </div>
          </div>

          {/* Wyświetlanie zawartości w zależności od aktywnej zakładki */}
          {activeTab === "overview" && (
            <>
              <SummaryCards transactions={transactions} />
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                <div className="lg:col-span-2">
                  <AddTransactionForm onAddTransaction={handleAddTransaction} />
                </div>
                <div className="lg:col-span-3">
                  <TransactionList
                    transactions={transactions}
                    onDeleteTransaction={handleDeleteTransaction}
                  />
                </div>
              </div>
            </>
          )}

          {activeTab === "transactions" && (
            <TransactionList
              transactions={transactions}
              onDeleteTransaction={handleDeleteTransaction}
            />
          )}

          {activeTab === "analytics" && (
            <AnalyticsView transactions={transactions} />
          )}

          {activeTab === "settings" && (
            <SettingsView
              user={user}
              onUserUpdate={handleUserUpdate}
              onLogout={handleLogout}
            />
          )}
        </div>
      </main>
    </div>
  );
}
