"use client";
import { useState } from "react";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  user: { firstName?: string; email?: string } | null;
  onLogout: () => void;
}

export default function Sidebar({
  activeTab,
  setActiveTab,
  user,
  onLogout,
}: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: "overview", label: "Przegląd", icon: "🏠" },
    { id: "transactions", label: "Transakcje", icon: "💰" },
    { id: "analytics", label: "Analityka", icon: "📈" },
    { id: "settings", label: "Ustawienia", icon: "⚙️" },
  ];

  return (
    <>
      {/* Pasek glowny dla ekranow mobilnych */}
      <div className="md:hidden flex justify-between items-center bg-slate-900/80 p-4 border-b border-slate-800 backdrop-blur-xl sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-pink-500 to-rose-500 flex items-center justify-center font-black text-white text-sm shadow-md shadow-pink-500/30">
            B
          </div>
          <span className="text-lg font-black text-white tracking-tight">
            Budget<span className="text-pink-400">o</span>
          </span>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-slate-300 hover:text-white p-2 text-xl focus:outline-none"
        >
          {isOpen ? "✖️" : "☰"}
        </button>
      </div>
      {/* Nakladka przy otwartym menu na telefonie */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-40 md:hidden"
        />
      )}

      {/* Główny Sidebar */}
      <aside
        className={`fixed md:sticky top-0 left-0 z-50 h-screen w-64 bg-slate-900/80 border-r border-slate-800/80 backdrop-blur-2xl flex flex-col justify-between p-6 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="flex flex-col gap-8">
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-pink-500 to-rose-500 flex items-center justify-center font-black text-white text-xl shadow-lg shadow-pink-500/30">
              B
            </div>
            <div>
              <h2 className="text-xl font-black text-white tracking-tight">
                Budget<span className="text-pink-400">o</span>
              </h2>
              <p className="text-[10px] text-slate-500 font-semibold tracking-wider uppercase">
                Finance Tracker
              </p>
            </div>
          </div>
          {/* Nawigacja */}
          <nav className="flex flex-col gap-2">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-2 px-3">
              Menu Główne
            </p>
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsOpen(false);
                  }}
                  className={`flex items-center gap-3.5 px-4 py-3 rounded-2xl text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? "bg-gradient-to-r from-pink-500/20 to-rose-500/10 text-pink-400 border border-pink-500/30 shadow-lg shadow-pink-500/10"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                  }`}
                >
                  <span className="text-base">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Dolna Sekcja Profilowa */}
        <div className="flex flex-col gap-4 border-t border-slate-800/80 pt-6">
          <div className="flex items-center gap-3 px-2">
            <div className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-emerald-400 text-sm">
              {user?.firstName ? user.firstName[0].toUpperCase() : "U"}
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-bold text-white truncate">
                {user?.firstName || "Użytkownik"}
              </span>
              <span className="text-xs text-slate-500 truncate">
                {user?.email}
              </span>
            </div>
          </div>

          <button
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 font-semibold py-3 rounded-xl text-xs transition-all border border-red-500/20 active:scale-95"
          >
            <span>🚪</span> Wyloguj się
          </button>
        </div>
      </aside>
    </>
  );
}
