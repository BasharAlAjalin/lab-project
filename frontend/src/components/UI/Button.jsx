import { MotionButton } from "./Motion";

export default function Button({
  variant = "primary",
  className = "",
  ...props
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 font-semibold transition focus:outline-none focus:ring-2 focus:ring-barca-gold/60";
  const variants = {
    primary:
      "bg-gradient-to-r from-barca-blue to-barca-maroon text-white shadow-glow hover:brightness-110",
    ghost: "border border-white/12 bg-white/5 text-white hover:bg-white/10",
    danger:
      "border border-rose-300/30 bg-rose-500/15 text-rose-100 hover:bg-rose-500/25",
  };

  return (
    <MotionButton
      whileTap={{ scale: 0.98 }}
      whileHover={{ y: -1 }}
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    />
  );
}
