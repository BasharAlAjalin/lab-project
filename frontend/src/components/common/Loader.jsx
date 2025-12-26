export default function Loader({ text = "Loading..." }) {
  return (
    <div className="min-h-[55vh] grid place-items-center gap-4">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-white/15 border-t-[#EDBB00]" />
      <p className="text-white/70">{text}</p>
    </div>
  );
}
