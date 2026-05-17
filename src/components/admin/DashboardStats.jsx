export default function DashboardStats({ stats }) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {stats.map((item) => (
        <div
          key={item.label}
          className="rounded-[1.8rem] border border-white/85 bg-white/80 p-6 shadow-[0_16px_50px_rgba(15,23,42,0.07)] backdrop-blur"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-gold">
            {item.label}
          </p>
          <div className="mt-5 flex items-end justify-between gap-3">
            <p className="text-4xl text-brand-navy">{item.value}</p>
            <div className="h-10 w-10 rounded-2xl bg-brand-cream/80" />
          </div>
        </div>
      ))}
    </div>
  );
}
