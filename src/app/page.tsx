import Link from "next/link";
import link from "next/link";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate flex flex-col justify-center items-center p-6 relative overflow-hidden">
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30rem] bg-fuchsia-600/10 rounded-full blur-3xl pointer-events-none" />

      {/*Efekt szkla*/}
      <div className="relative z-10 max-w-xl w-full bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 p-8 sm:p-10 rounded-3xl shadow-2xl text-center hover:border-pink-500/30 transition-colors duration-300">
        <div className="infline-flex items-center gap-2 bg-slate-800/80 border border-pink-500/30 px-3 py-1.5 rounded-full text-xs font-medium text-pink-300 mb-6 shadow-sm shadow-pink-500/10">
          <span className="w-2 h-2 rounded-full bg-pink-400 animate-pusle" />
          Inteligentny budżet domowy
        </div>

        {/*Naglowek z rozowym i szmaragdowym gradientem*/}
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white-mb-4">
          Panuj nad kasą z <br />
          <span className="bg-gradient-to-r from-pink-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
            Budgeto.
          </span>
        </h1>

        {/*Opis*/}
        <p className="text-slate-400 text-base sm:text-lg mb-8 leading-relaxed max-w-md mx-auto">
          Koniec ze zgadywaniem, gdzie podziały się Twoje pieniądze. Śledż
          wydatki i planuj oszczędności w jednym miejscu.
        </p>

        {/*Przyciski*/}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/login"
            className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-400 hover:to-rose-400 text-white font-bold px-6 py-3.5 rounded-xl transition-all duration-200 shadow-lg shadow-pink-500/25 flex items-center justify-center gap-2 group "
          >
            Zaloguj się
            <span className="group-hover:translate-x-1 transition-transform">
              →
            </span>
          </Link>

          <Link
            href="/register"
            className="bg-slate-800/90 hover:bg-slate-700/80 text-slate-200 font-semibold px-6 py-3.5 rounded-xl transition border border-slate-700/60 hover:border-pink-500/40 flex items-center justify-center"
          >
            Załóż konto
          </Link>
        </div>
      </div>
    </main>
  );
}
