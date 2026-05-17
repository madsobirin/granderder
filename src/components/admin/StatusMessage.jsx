export default function StatusMessage({ message }) {
  if (!message) return null;

  return (
    <div className="rounded-[1.6rem] border border-brand-gold/20 bg-white/70 px-5 py-4 text-sm text-brand-navy shadow-[0_12px_32px_rgba(197,163,104,0.08)] backdrop-blur">
      {message}
    </div>
  );
}
