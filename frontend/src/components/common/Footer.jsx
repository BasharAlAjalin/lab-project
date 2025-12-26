export default function Footer() {
  return (
    <div style={{ padding: 16, borderTop: "1px solid #eee", marginTop: 30, textAlign: "center", opacity: 0.8 }}>
      <small>© {new Date().getFullYear()} Lab Project</small>
    </div>
  );
}
