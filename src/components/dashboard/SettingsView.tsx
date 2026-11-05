"use client";

import { useState } from "react";

interface SettingsViewProps {
  user: {
    id?: string;
    name?: string;
    firstName?: string;
    email?: string;
  } | null;
  onUserUpdate: (updatedUser: any) => void;
  onLogout: () => void;
}

export default function SettingsView({
  user,
  onUserUpdate,
  onLogout,
}: SettingsViewProps) {
  const [name, setName] = useState(user?.name || user?.firstName || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [status, setStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);
    setLoading(true);

    try {
      const res = await fetch("/api/user", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user?.id,
          name,
          currentPassword: currentPassword || undefined,
          newPassword: newPassword || undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Błąd zapisywania zmian.");
      }

      setStatus({
        type: "success",
        message: "Ustawienia zostały pomyślnie zaktualizowane!",
      });
      setCurrentPassword("");
      setNewPassword("");

      // Aktualizacja stanu w nadrzędnym komponencie i localStorage
      if (data.user) {
        onUserUpdate(data.user);
      }
    } catch (err: any) {
      setStatus({ type: "error", message: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl space-y-8">
      <div className="bg-slate-900/60 p-6 sm:p-8 rounded-3xl border border-slate-800/80 backdrop-blur-xl shadow-xl">
        <h2 className="text-xl font-bold text-white mb-6">
          Ustawienia profilu
        </h2>

        {status && (
          <div
            className={`mb-6 p-4 rounded-xl text-sm font-medium ${
              status.type === "success"
                ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-400"
                : "bg-rose-500/10 border border-rose-500/30 text-rose-400"
            }`}
          >
            {status.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Dane Podstawowe */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
              Dane osobowe
            </h3>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">
                Adres Email
              </label>
              <input
                type="email"
                disabled
                value={user?.email || ""}
                className="w-full bg-slate-950/40 border border-slate-800 text-slate-500 rounded-xl p-3 text-sm cursor-not-allowed"
              />
              <p className="text-xs text-slate-600 mt-1">
                Adres e-mail jest przypisany do konta i nie podlega edycji.
              </p>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">
                Imię / Nazwa użytkownika
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-950/80 border border-slate-800 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 text-slate-100 rounded-xl p-3 text-sm outline-none transition-all"
              />
            </div>
          </div>

          <hr className="border-slate-800" />

          {/* Zmiana Hasła */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
              Zmiana hasła (opcjonalnie)
            </h3>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">
                Obecne hasło
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full bg-slate-950/80 border border-slate-800 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 text-slate-100 placeholder:text-slate-600 rounded-xl p-3 text-sm outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">
                Nowe hasło
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full bg-slate-950/80 border border-slate-800 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 text-slate-100 placeholder:text-slate-600 rounded-xl p-3 text-sm outline-none transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold py-3.5 rounded-xl transition-all duration-200 shadow-lg shadow-emerald-500/20 active:scale-[0.99] disabled:opacity-50"
          >
            {loading ? "Zapisywanie..." : "Zapisz zmiany"}
          </button>
        </form>
      </div>

      {/* Strefa wylogowania */}
      <div className="bg-slate-900/60 p-6 rounded-3xl border border-rose-900/30 backdrop-blur-xl flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-white">
            Wyloguj się z sesji
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Zakończ obecną sesję użytkownika na tym urządzeniu.
          </p>
        </div>
        <button
          onClick={onLogout}
          className="bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-400 font-semibold px-5 py-2.5 rounded-xl transition-all text-sm"
        >
          Wyloguj się
        </button>
      </div>
    </div>
  );
}
