export default function DashboardStats({ stats }) {
  return (
    <div className="mb-8 grid gap-4 md:grid-cols-3">
      {stats.map((item) => (
        <div
          key={item.label}
          className="rounded-3xl border border-white/70 bg-white p-6 shadow-xl shadow-brand-navy/5"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-gold">
            {item.label}
          </p>
          <p className="mt-3 text-4xl text-brand-navy">{item.value}</p>
        </div>
      ))}
    </div>
  );
}
