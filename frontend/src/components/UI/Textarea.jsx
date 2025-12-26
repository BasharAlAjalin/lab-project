export default function Textarea({ className = "", ...props }) {
  return (
    <textarea
      className={`w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-900/20 ${className}`}
      {...props}
    />
  );
}
