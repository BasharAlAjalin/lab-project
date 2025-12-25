import { useState } from "react";
import { verifyApi } from "../../api/auth.api";

export default function Verify() {
  const [email, setEmail] = useState("");
  const [channel, setChannel] = useState("EMAIL");
  const [code, setCode] = useState("");
  const [msg, setMsg] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    const res = await verifyApi({ email, channel, code });
    setMsg(res.data.message);
  };

  return (
    <div>
      <h2>Verify</h2>
      <form onSubmit={onSubmit}>
        <input placeholder="Email" onChange={e=>setEmail(e.target.value)}/>
        <select onChange={e=>setChannel(e.target.value)}>
          <option value="EMAIL">Email</option>
          <option value="WHATSAPP">WhatsApp</option>
        </select>
        <input placeholder="Code" onChange={e=>setCode(e.target.value)}/>
        <button>Verify</button>
      </form>
      {msg && <p>{msg}</p>}
    </div>
  );
}