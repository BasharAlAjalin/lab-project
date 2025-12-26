export default function Loader({ text = "Loading..." }) {
  return (
    <div style={{ padding: 20, textAlign: "center" }}>
      <p>{text}</p>
    </div>
  );
}
