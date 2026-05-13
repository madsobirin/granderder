"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, LockKeyhole, Mail, ShieldCheck } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (data.success) {
        router.push("/dashboard");
      } else {
        setError(data.message || "Email atau password belum sesuai.");
      }
    } catch {
      setError("Terjadi kesalahan saat login. Coba lagi sebentar.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-brand-cream relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(197,163,104,0.18),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(15,23,42,0.1),transparent_32%)]" />
      <div className="absolute top-0 right-0 h-80 w-80 rounded-full bg-brand-gold/10 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-brand-navy/8 blur-3xl" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid w-full gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="hidden lg:block pr-8">
            <span className="mb-4 block text-xs font-semibold uppercase tracking-[0.35em] text-brand-gold">
              Grand Ender Residence
            </span>
            <h1 className="mb-6 text-5xl leading-tight text-brand-navy">
              Panel admin dengan rasa visual yang sama seperti halaman utama.
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-brand-navy/65">
              Kelola promo unit, tambah foto terbaru proyek, dan pastikan semua
              konten marketing tetap rapi, premium, dan mudah diperbarui.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/70 bg-white/80 p-5 shadow-xl shadow-brand-navy/5 backdrop-blur">
                <ShieldCheck className="mb-4 h-8 w-8 text-brand-gold" />
                <p className="text-sm font-semibold text-brand-navy">Akses aman admin</p>
              </div>
              <div className="rounded-2xl border border-white/70 bg-white/80 p-5 shadow-xl shadow-brand-navy/5 backdrop-blur">
                <Mail className="mb-4 h-8 w-8 text-brand-gold" />
                <p className="text-sm font-semibold text-brand-navy">Update konten cepat</p>
              </div>
              <div className="rounded-2xl border border-white/70 bg-white/80 p-5 shadow-xl shadow-brand-navy/5 backdrop-blur">
                <LockKeyhole className="mb-4 h-8 w-8 text-brand-gold" />
                <p className="text-sm font-semibold text-brand-navy">Siap untuk galeri baru</p>
              </div>
            </div>
          </div>

          <div className="mx-auto w-full max-w-md rounded-[2rem] border border-white/70 bg-white/85 p-8 shadow-2xl shadow-brand-navy/10 backdrop-blur-xl sm:p-10">
            <div className="mb-8 text-center">
              <span className="mb-3 inline-flex rounded-full bg-brand-gold/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-brand-gold">
                Admin Access
              </span>
              <h2 className="text-3xl text-brand-navy">Login Dashboard</h2>
              <p className="mt-3 text-sm leading-relaxed text-brand-navy/60">
                Masuk untuk mengelola gambar proyek dan promo rumah terbaru.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-brand-navy">
                  Email admin
                </span>
                <div className="flex items-center rounded-2xl border border-brand-navy/10 bg-brand-cream/60 px-4 py-3 focus-within:border-brand-gold">
                  <Mail className="mr-3 h-5 w-5 text-brand-gold" />
                  <input
                    type="email"
                    placeholder="admin@gmail.com"
                    className="w-full bg-transparent text-brand-navy outline-none placeholder:text-brand-navy/35"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                  />
                </div>
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-brand-navy">
                  Password
                </span>
                <div className="flex items-center rounded-2xl border border-brand-navy/10 bg-brand-cream/60 px-4 py-3 focus-within:border-brand-gold">
                  <LockKeyhole className="mr-3 h-5 w-5 text-brand-gold" />
                  <input
                    type="password"
                    placeholder="Masukkan password"
                    className="w-full bg-transparent text-brand-navy outline-none placeholder:text-brand-navy/35"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                  />
                </div>
              </label>

              {error ? (
                <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                  {error}
                </div>
              ) : null}

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-3 rounded-2xl bg-brand-navy px-5 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-brand-navy/92 disabled:cursor-not-allowed disabled:opacity-70"
              >
                <span>{loading ? "Memproses..." : "Masuk ke Dashboard"}</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-brand-navy/55">
              Kembali ke{" "}
              <Link href="/" className="font-semibold text-brand-gold hover:text-brand-navy">
                halaman utama
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
