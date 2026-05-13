export default function StatusMessage({ message }) {
  if (!message) return null;

  return (
    <div className="mb-6 rounded-2xl border border-brand-gold/20 bg-brand-gold/10 px-4 py-3 text-sm text-brand-navy">
      {message}
    </div>
  );
}
