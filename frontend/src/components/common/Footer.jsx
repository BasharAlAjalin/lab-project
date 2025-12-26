export default function Footer() {
  return (
    <footer className="mt-14 border-t border-white/10 bg-slate-950/40">
      <div className="mx-auto w-full max-w-6xl px-4 py-6 text-sm text-white/60">
        © {new Date().getFullYear()} MyStore — Blaugrana Theme
      </div>
    </footer>
  );
}
