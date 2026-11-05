"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [firstName, setName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [showPassword, setshowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Hasła nie są identyczne!");
      return; // Stopuje kod i NIE wykonuje router.push('/login')
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, email, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Wystąpił błąd podczas rejestracji.");
        setLoading(false);
        return;
      }
      router.push("/login");
    } catch (err) {
      setError("Coś poszło nie tak. Spróbuj ponownie.");
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center items-center p- relative overflow-hidden">
      {/* Tlo */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl poiner-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl poiner-events-none" />

      {/* Powrot do strony glownej */}

      <Link
        href="/"
        className="absolute top-8 left-8 text-sm font-medium text-slate-400 hover:text-pink-400 transition-colors flex items-center gap-2"
      >
        ← Powrót do strony głównej
      </Link>

      {/* Karta formularza logowania */}

      <div className="relative z-10 max-w-md w-full bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 sm:p-10 rounded-3xl shadow-2xl">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-black tracking-tight text-white">
            Dołacz do nas! <br />
          </h1>
          <p className="text-slate-400 text-sm">
            Załóż konto w{" "}
            <span className="text-emerald-400 font-simebold">Budgeto</span>
          </p>
        </div>

        {/* Informacja o errorze*/}
        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/10 rounded-xl text-red-400 text-xs text-center font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Imie*/}
          <div>
            <label className="block text-sm font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
              Imie
            </label>
            <input
              type="text"
              required
              placeholder="np. Aleksandra"
              value={firstName}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-slate-950/80 border border-slate-800 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 text-slate-100 placeholder:text-slate-600 rounded-xl p-3 text-sm outline-none transition-all"
            />
          </div>

          {/* Nazwisko*/}
          <div>
            <label className="block text-sm font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
              Nazwisko
            </label>
            <input
              type="text"
              required
              placeholder="np. Smal"
              value={lastName}
              onChange={(e) => setlastName(e.target.value)}
              className="w-full bg-slate-950/80 border border-slate-800 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 text-slate-100 placeholder:text-slate-600 rounded-xl p-3 text-sm outline-none transition-all"
            />
          </div>

          {/* Email*/}
          <div>
            <label className="block text-sm font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
              Adres Email
            </label>
            <input
              type="email"
              required
              placeholder="np. twoj@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-950/80 border border-slate-800 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 text-slate-100 placeholder:text-slate-600 rounded-xl p-3 text-sm outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Hasło
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-950/80 border border-slate-800 focus:border-pink-500 focus:ring-1 focus:ring-pink-500 text-slate-100 placeholder:text-slate-600 rounded-xl p-3.5 text-sm outline-none transition-all"
              />
              <button
                type="button"
                onClick={() => setshowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-pink-400 transition-colors p-1"
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                    />
                  </svg>
                ) : (
                  /* Ikona oka zwykłego (Pokaż) */
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12c1.274 4.057 5.065 7 9.542 7 4.477 0 8.268-2.943 9.542-7-1.274-4.057-5.064-7-9.542-7-4.477 0-8.268 2.943-9.542 7z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Powtórz Hasło
            </label>

            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                required
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setconfirmPassword(e.target.value)}
                className="w-full bg-slate-950/80 border border-slate-800 focus:border-pink-500 focus:ring-1 focus:ring-pink-500 text-slate-100 placeholder:text-slate-600 rounded-xl p-3.5 text-sm outline-none transition-all"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-pink-400 transition-colors p-1"
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                    />
                  </svg>
                ) : (
                  /* Ikona oka zwykłego (Pokaż) */
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12c1.274 4.057 5.065 7 9.542 7 4.477 0 8.268-2.943 9.542-7-1.274-4.057-5.064-7-9.542-7-4.477 0-8.268 2.943-9.542 7z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold py-3.5 rounded-xl transition-all duration-200 shadow-lg shadow-emerald-500/25 active:scale-[0.98]"
          >
            {loading ? "Tworzenie konta..." : "Załóż konto"}
          </button>
        </form>

        <p className="text-center text-xs text-slate-400 mt-6">
          Masz już konto?{" "}
          <Link
            href="/login"
            className="text-emerald-400 hover:underline font-medium"
          >
            Zaloguj się
          </Link>
        </p>
      </div>
    </main>
  );
}
