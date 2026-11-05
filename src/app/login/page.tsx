"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); //czyszczenie poprzednich bledow
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Wystąpił błąd logowania.");
        setLoading(false);
        return;
      }

      //zapisujemy dane logowania w localStorage
      localStorage.setItem("user", JSON.stringify(data.user));
      router.push("/dashboard");
    } catch (err) {
      setError("Coś poszło nie tak. Spróbuj ponownie.");
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center items-center p-6 relative overflow-hidden">
      {/* Tlo */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl poiner-events-none" />

      {/* Powrot do strony glownej */}

      <Link
        href="/"
        className="absolute top-8 left-8 text-sm font-medium text-slate-400 hover:text-pink-400 transition-colors flex items-center gap-2"
      >
        ← Powrót do strony głównej
      </Link>

      {/* Karta formularza logowania */}

      <div className="relative z-10 max-w-md w-full bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 p-8 sm:p-10 rounded-3xl shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black tracking-tight text-white">
            Witamy z powrotem! <br />
          </h1>
          <p className="text-slate-400 text-sm">
            Zaloguj się do{" "}
            <span className="text-pink-400 font-semibold">Budgeto</span>
          </p>
        </div>

        {/* Informacja o błędzie*/}
        {error && (
          <div className="mb-6 p-3.5 bg-red-500/10 border border-red-500/50 rounded-xl text-red-400 text-xs text-center font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label className="block text-sm font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Adres email
            </label>
            <input
              type="email"
              required
              placeholder="twoj@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-950/80 border border-slate-800 focus:border-pink-500 focus:ring-1 focus:ring-pink-500 text-slate-100 placeholder:text-slate-600 rounded-xl p-3.5 text-sm outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Hasło
            </label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-950/80 border border-slate-800 focus:border-pink-500 focus:ring-1 focus:ring-pink-500 text-slate-100 placeholder:text-slate-600 rounded-xl p-3.5 text-sm outline-none transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-400 hover:to-rose-400 text-white font-bold py-3.5 rounded-xl transition-all duration-200 shadow-lg shadow-pink-500/25 active:scale-[0.98] disabled:opacity-50"
          >
            {loading ? "Logowanie..." : "Zaloguj się"}
          </button>
        </form>

        <p className="text-center text-xs text-slate-400 mt-6">
          Nie masz jeszcze konta?{" "}
          <Link
            href="/register"
            className="text-pink-400 hover:underline font-medium"
          >
            Zarejestruj się
          </Link>
        </p>
      </div>
    </main>
  );
}
