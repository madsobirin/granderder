import { useRouter } from "next/navigation";
import { ArrowUpRight, LogOut } from "lucide-react";

export default function DashboardHeader() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/logout", {
      method: "POST",
    });
    router.push("/login");
  };

  return (
    <div className="border-b border-brand-dark/5 bg-white/85 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
        <div>
          <span className="block text-xs font-semibold uppercase tracking-[0.35em] text-brand-gold">
            Grand Ender Residence
          </span>
          <h1 className="mt-2 text-3xl text-brand-navy">Dashboard Admin</h1>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push("/")}
            className="inline-flex items-center gap-2 rounded-full border border-brand-navy/10 bg-white px-4 py-2 text-sm font-medium text-brand-navy transition hover:border-brand-gold hover:text-brand-gold"
          >
            <ArrowUpRight className="h-4 w-4" />
            Lihat Website
          </button>
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 rounded-full bg-brand-navy px-4 py-2 text-sm font-medium text-white transition hover:bg-brand-navy/90"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
