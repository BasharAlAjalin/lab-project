export default function Alert({ text, type = "info" }) {
  const styles = {
    info: "border-gray-200 bg-gray-50 text-gray-700",
    success: "border-green-200 bg-green-50 text-green-700",
    error: "border-red-200 bg-red-50 text-red-700",
  };
  return (
    <div className={`rounded-xl border px-3 py-2 text-sm ${styles[type]}`}>
      {text}
    </div>
  );
}
