"use client";

interface HeaderProps {
  user: { firstName?: string; email?: string } | null;
  onLogout: () => void;
}

export default function Header({ user, onLogout }: HeaderProps) {
  return (
    <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900/60 p-6 rounded-3xl border border-slate-800/60 backdrop-blur-xl shadow-xl">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          Cześć,{" "}
          <span className="text-emerald-400">
            {user?.firstName || "Użytkowniku!"}
          </span>
        </h1>
        <p className="text-slate-400 text-xs sm:text-sm mt-0.5">
          {user?.email}
        </p>
      </div>

      <button
        onClick={onLogout}
        className="bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 font-semibold px-4 py-2.5 rounded-xl text-sm sm:text-sm transition-all border border-red-500/20 activate:scale-95"
      >
        Wyloguj się
      </button>
    </header>
  );
}
